<?php
class SafeMySQL
{
	/*
	'host'      => 'localhost',
		'user'      => 'flowesj1_bot',
		'pass'      => 'U10^Ql)}R-oD',
		'db'        => 'flowesj1_bot',
	*/
	protected $conn;
	protected $stats;
	protected $emode;
	protected $exname;
	protected $defaults = array(
		'host'      => 'localhost',
		'user'      => 'flowesj1_bot',
		'pass'      => 'U10^Ql)}R-oD',
		'db'        => 'flowesj1_bot',
		'port'      => 3306,
		'charset'   => 'utf8',
		'errmode'   => 'exception', //or 'error'
		'exception' => 'Exception', //Exception class name
	);
	const RESULT_ASSOC = MYSQLI_ASSOC;
	const RESULT_NUM   = MYSQLI_NUM;
	function __construct($opt = array())
	{
		$opt = array_merge($this->defaults,$opt);
		$this->emode  = $opt['errmode'];
		$this->exname = $opt['exception'];
		if (isset($opt['mysqli']))
		{
			if ($opt['mysqli'] instanceof mysqli)
			{
				$this->conn = $opt['mysqli'];
				return;
			} else {
				$this->error("mysqli option must be valid instance of mysqli class");
			}
		}
		if ($opt['pconnect'])
		{
			$opt['host'] = "p:".$opt['host'];
		}
	@$this->conn = mysqli_connect($opt['host'], $opt['user'], $opt['pass'], $opt['db'], $opt['port']/*, $opt['socket']*/);
		if ( !$this->conn )
		{
			$this->error(mysqli_connect_errno()." ".mysqli_connect_error());
		}
		mysqli_set_charset($this->conn, $opt['charset']) or $this->error(mysqli_error($this->conn));
		unset($opt); // I am paranoid
	}

	public function query()
	{	
		return $this->rawQuery($this->prepareQuery(func_get_args()));
	}

	public function fetch($result,$mode=self::RESULT_ASSOC)
	{
		return mysqli_fetch_array($result, $mode);
	}

	public function affectedRows()
	{
		return mysqli_affected_rows ($this->conn);
	}

	public function insertId()
	{
		return mysqli_insert_id($this->conn);
	}

	public function numRows($sql)
	{
        $result = $this->query($sql);
        return mysqli_num_rows($result);
	}

	public function free($result)
	{
		mysqli_free_result($result);
	}

	public function getOne()
	{
		$query = $this->prepareQuery(func_get_args());
		if ($res = $this->rawQuery($query))
		{
			$row = $this->fetch($res);
			if (is_array($row)) {
				return reset($row);
			}
			$this->free($res);
		}
		return FALSE;
	}

	public function getRow()
	{
		$query = $this->prepareQuery(func_get_args());
		if ($res = $this->rawQuery($query)) {
			$ret = $this->fetch($res);
			$this->free($res);
			return $ret;
		}
		return FALSE;
	}

	public function getCol()
	{
		$ret   = array();
		$query = $this->prepareQuery(func_get_args());
		if ( $res = $this->rawQuery($query) )
		{
			while($row = $this->fetch($res))
			{
				$ret[] = reset($row);
			}
			$this->free($res);
		}
		return $ret;
	}

	public function getAll()
	{
		$ret   = array();
		$query = $this->prepareQuery(func_get_args());
		if ( $res = $this->rawQuery($query) )
		{
			while($row = $this->fetch($res))
			{
				$ret[] = $row;
			}
			$this->free($res);
		}
		return $ret;
	}

	public function getInd()
	{
		$args  = func_get_args();
		$index = array_shift($args);
		$query = $this->prepareQuery($args);
		$ret = array();
		if ( $res = $this->rawQuery($query) )
		{
			while($row = $this->fetch($res))
			{
				$ret[$row[$index]] = $row;
			}
			$this->free($res);
		}
		return $ret;
	}

	public function getIndCol()
	{
		$args  = func_get_args();
		$index = array_shift($args);
		$query = $this->prepareQuery($args);
		$ret = array();
		if ( $res = $this->rawQuery($query) )
		{
			while($row = $this->fetch($res))
			{
				$key = $row[$index];
				unset($row[$index]);
				$ret[$key] = reset($row);
			}
			$this->free($res);
		}
		return $ret;
	}

	public function parse()
	{
		return $this->prepareQuery(func_get_args());
	}

	public function whiteList($input,$allowed,$default=FALSE)
	{
		$found = array_search($input,$allowed);
		return ($found === FALSE) ? $default : $allowed[$found];
	}

	public function filterArray($input,$allowed)
	{
		foreach(array_keys($input) as $key )
		{
			if ( !in_array($key,$allowed) )
			{
				unset($input[$key]);
			}
		}
		return $input;
	}

	public function lastQuery()
	{
		$last = end($this->stats);
		return $last['query'];
	}

	public function getStats()
	{
		return $this->stats;
	}

	protected function rawQuery($query)
	{
		$start = microtime(TRUE);
		$res   = mysqli_query($this->conn, $query);
		$timer = microtime(TRUE) - $start;
		$this->stats[] = array(
			'query' => $query,
			'start' => $start,
			'timer' => $timer,
		);
		if (!$res)
		{
			$error = mysqli_error($this->conn);
			
			end($this->stats);
			$key = key($this->stats);
			$this->stats[$key]['error'] = $error;
			$this->cutStats();
			
			$this->error("$error. Full query: [$query]");
		}
		$this->cutStats();
		return $res;
    }
    
	protected function prepareQuery($args)
	{
		$query = '';
		$raw   = array_shift($args);
		$array = preg_split('~(\?[nsiuap])~u',$raw,null,PREG_SPLIT_DELIM_CAPTURE);
		$anum  = count($args);
		$pnum  = floor(count($array) / 2);
		if ( $pnum != $anum )
		{
			$this->error("Number of args ($anum) doesn't match number of placeholders ($pnum) in [$raw]");
		}
		foreach ($array as $i => $part)
		{
			if ( ($i % 2) == 0 )
			{
				$query .= $part;
				continue;
			}
			$value = array_shift($args);
			switch ($part)
			{
				case '?n':
					$part = $this->escapeIdent($value);
					break;
				case '?s':
					$part = $this->escapeString($value);
                    break;
				case '?i':
					$part = $this->escapeInt($value);
					break;
				case '?a':
					$part = $this->createIN($value);
					break;
				case '?u':
					$part = $this->createSET($value);
					break;
				case '?p':
					$part = $value;
					break;
			}
			$query .= $part;
		}
		return $query;
	}
	protected function escapeInt($value)
	{
		if ($value === NULL)
		{
			return 'NULL';
		}
		if(!is_numeric($value))
		{
			$this->error("Integer (?i) placeholder expects numeric value, ".gettype($value)." given");
			return FALSE;
		}
		if (is_float($value))
		{
			$value = number_format($value, 0, '.', ''); // may lose precision on big numbers
		} 
		return $value;
	}
	protected function escapeString($value)
	{
		if ($value === NULL)
		{
			return 'NULL';
        }
		return	"'".mysqli_real_escape_string($this->conn,$value)."'";
    }
	protected function escapeIdent($value)
	{
		if ($value)
		{
			return "`".str_replace("`","``",$value)."`";
		} else {
			$this->error("Empty value for identifier (?n) placeholder");
		}
	}
	protected function createIN($data)
	{
		if (!is_array($data))
		{
			$this->error("Value for IN (?a) placeholder should be array");
			return;
		}
		if (!$data)
		{
			return 'NULL';
		}
		$query = $comma = '';
		foreach ($data as $value)
		{
			$query .= $comma.$this->escapeString($value);
			$comma  = ",";
		}
		return $query;
	}
	protected function createSET($data)
	{
		if (!is_array($data))
		{
			$this->error("SET (?u) placeholder expects array, ".gettype($data)." given");
			return;
		}
		if (!$data)
		{
			$this->error("Empty array for SET (?u) placeholder");
			return;
		}
		$query = $comma = '';
		foreach ($data as $key => $value)
		{
			$query .= $comma.$this->escapeIdent($key).'='.$this->escapeString($value);
			$comma  = ",";
		}
		return $query;
	}
	protected function error($err)
	{
		$err  = __CLASS__.": ".$err;
		if ( $this->emode == 'error' )
		{
			$err .= ". Error initiated in ".$this->caller().", thrown";
			trigger_error($err,E_USER_ERROR);
		} else {
			throw new $this->exname($err);
		}
	}
	protected function caller()
	{
		$trace  = debug_backtrace();
		$caller = '';
		foreach ($trace as $t)
		{
			if ( isset($t['class']) && $t['class'] == __CLASS__ )
			{
				$caller = $t['file']." on line ".$t['line'];
			} else {
				break;
			}
		}
		return $caller;
	}

	protected function cutStats()
	{
		if ( count($this->stats) > 100 )
		{
			reset($this->stats);
			$first = key($this->stats);
			unset($this->stats[$first]);
		}
    }
    public function search_product($tableName) {
        $subtitle = $_GET['subtitle'];
        $color = $_GET['color'];
        $occasion = $_GET['occasion'];
		$gift_type = $_GET['gift_type'];
		
		$price_range = preg_replace('/[^0-9]/', '' ,$_GET['price']);
		$sort_gift = $_GET['sort'];

        //Do real escaping here
        $sql = $this->parse("SELECT * FROM ?n", $tableName);
        $conditions = array();

        if(! empty($subtitle)) 
        {
            $subtitle = "%".$subtitle."%";
            $conditions[] = $this->parse("subtitle LIKE ?s", $subtitle);
        }
        if(! empty($color)) 
        {
            $color = "%".$color."%";
            $conditions[] = $this->parse("color LIKE ?s", $color); //preg_replace("/[^a-zA-Z0-9]+/", "", $s)
        }
        if(! empty($occasion)) 
        { 
            $occasion = "%".$occasion."%";
            $conditions[] = $this->parse("occasion LIKE ?s", $occasion);
        }
        if(! empty($gift_type)) 
        {
            $gift_type = "%".$gift_type."%";
            $conditions[] = $this->parse("gift_type LIKE ?s", $gift_type);
		}
		//
		if(! empty($price_range)) 
        {
            $conditions[] = $this->parse("price <= ?i ", $price_range); //price BETWEEN 10 AND 20
		}
		//
        if (count($conditions) > 0) 
            $sql .= " WHERE " . implode(' AND ', $conditions);

		if(! empty($sort_gift)) 
            $sort_gift = "ORDER BY price ".$sort_gift;

        return $sql.$sort_gift;  //return sql query
    }
}
//end of MySql CLASS

class pagination
{
  /**
   * Properties array
   * @var array   
   * @access private 
   */
  private $_properties = array();
  /**
   * Default configurations
   * @var array  
   * @access public 
   */
  public $_defaults = array(
    'page' => 1,
    'perPage' => 7 
  );
  /**
   * Constructor
   * 
   * @param array $array   Array of results to be paginated
   * @param int   $curPage The current page interger that should used
   * @param int   $perPage The amount of items that should be show per page
   * @return void    
   * @access public  
   */
  public function __construct($array, $curPage = null, $perPage = null)
  {
    $this->array   = $array;
    $this->curPage = ($curPage == null ? $this->defaults['page']    : $curPage);
    $this->perPage = ($perPage == null ? $this->defaults['perPage'] : $perPage);
  }
  /**
   * Global setter
   * 
   * Utilises the properties array
   * 
   * @param string $name  The name of the property to set
   * @param string $value The value that the property is assigned
   * @return void    
   * @access public  
   */
  public function __set($name, $value) 
  { 
    $this->_properties[$name] = $value;
  } 
  /**
   * Global getter
   * 
   * Takes a param from the properties array if it exists
   * 
   * @param string $name The name of the property to get
   * @return mixed Either the property from the internal
   * properties array or false if isn't set
   * @access public  
   */
  public function __get($name)
  {
    if (array_key_exists($name, $this->_properties)) {
      return $this->_properties[$name];
    }
    return false;
  }
  /**
   * Set the show first and last configuration
   * 
   * This will enable the "<< first" and "last >>" style
   * links
   * 
   * @param boolean $showFirstAndLast True to show, false to hide.
   * @return void    
   * @access public  
   */
  
  public function setShowFirstAndLast($showFirstAndLast)
  {
      $this->_showFirstAndLast = $showFirstAndLast;
  }
  /**
   * Set the main seperator character
   * 
   * By default this will implode an empty string
   * 
   * @param string $mainSeperator The seperator between the page numbers
   * @return void    
   * @access public  
   */
  /*
  public function setMainSeperator($mainSeperator)
  {
    $this->mainSeperator = $mainSeperator;
  }
  /**
   * Get the result portion from the provided array 
   * 
   * @return array Reduced array with correct calculated offset 
   * @access public 
   */
  public function getResults()
  {
    // Assign the page variable
    if (empty($this->curPage) !== false) {
      $this->page = $this->curPage; // using the get method
    } else {
      $this->page = 1; // if we don't have a page number then assume we are on the first page
    }
    
    // Take the length of the array
    $this->length = count($this->array);
    
    // Get the number of pages
    $this->pages = ceil($this->length / $this->perPage);
    
    // Calculate the starting point 
    $this->start = ceil(($this->page - 1) * $this->perPage);
    
    // return the portion of results
    return array_slice($this->array, $this->start, $this->perPage);
  }
  
  /**
   * Get the html links for the generated page offset
   * 
   * @param array $params A list of parameters (probably get/post) to
   * pass around with each request
   * @return mixed  Return description (if any) ...
   * @access public 
   */
  public function getLinks($params = array())
  {
    // Initiate the links array
    $plinks = array();
    $links = array();
    $slinks = array();
    
    // Concatenate the get variables to add to the page numbering string
    $queryUrl = '';
    if (!empty($params) === true) {
      unset($params['page']);
      $queryUrl = '&amp;'.http_build_query($params);
    }
    // If we have more then one pages
    if (($this->pages) > 1) {
        
	  $url= "https://dubaifloral.com/bot-assets/productadvisor.php";

      //$url= "http://createown.loc/paginator.php";
      // Assign the 'next page' if we are not on the last page
      if ($this->page < $this->pages) {
        $slinks[] = $url.'?page='.($this->page + 1).$queryUrl;
        //$slinks[] = ;
        echo ' 
          {
              "title":"See More",
              "url": "'.implode(' ', $plinks).implode($this->mainSeperator, $links).implode(' ', $slinks).'", 
              "type":"json_plugin_url"
          },
          {
              "title":"Start Over",
              "type": "show_block",
              "block_names": ["ProductAdvisor-Answers"]
          }';
      }
      else {
          echo' 
          {
              "title":"Create Own",
              "type": "show_block",
              "block_names": ["End of Suggestions"]
          },
          {
              "title":"Request Flowers",
              "type": "show_block",
              "block_names": ["Inquire-What Flowers"]
          },
          {
              "title":"To Collections",
              "type": "show_block",
              "block_names": ["Collections"]
          }';
      }
      // Push the array into a string using any some glue
      //return implode(' ', $plinks).implode($this->mainSeperator, $links).implode(' ', $slinks);
    }
    return;
  }
}
//end of pagination class

$db_products = new SafeMySQL(); // with default settings
$table = "flower_bot_products";
$sql = $db_products->search_product($table);
//echo $sql;
$productList = $db_products->getAll($sql);

//Gift advisor start
if (count($productList)) {
    // Create the pagination object
    $pagination = new pagination($productList, (isset($_GET['page']) ? $_GET['page'] : 1), 7);
    // Decide if the first and last links should show
    $pagination->setShowFirstAndLast(false);
    // Parse through the pagination class
    $productPages = $pagination->getResults();

    if (count($productPages) != 0) {
       //Create JSON
       echo'{
          "messages": [
             {
               "attachment":{
                 "type":"template",
                 "payload":{
                   "template_type":"generic",
                   "image_aspect_ratio": "square",
                   "elements":[
      ';

        // Loop through all the items in the array
        foreach ($productPages as $productArray) {
          // Show the information about the item
          //echo '<p><b>'.$productArray['title'].'</b> &nbsp; &pound;'.$productArray['subtitle'].'</p>';
          echo '
              {
               "title":"'.$productArray['title'].'",
               "image_url":"'.$productArray['url'].'",
               "subtitle":"'.$productArray['subtitle'].'",
               "buttons":[
                 {
                      "type": "show_block",
                      "block_names": ["AED-setPrice"],
                      "title": "Buy for AED '.$productArray['price'].'"
                 },
                 {
                   "type":"element_share"
                 }
               ]
              } 
          '; if ($productArray != end($productPages)) echo ',';
        }
        echo '
           ]
         }
       },
       "quick_replies": [';
        // print out the page numbers beneath the results
        echo $pageNumbers = $pagination->getLinks($_GET); //quick replies
        
        echo '            
        ]
     }
   ]
 }
';
      }
}
else {
	echo
	'
	{
		"messages": [
		  {
			"attachment": {
			  "type": "template",
			  "payload": {
				"template_type": "button",
				"text": "Sorry. Nothing match to your request",
				"buttons": [
				  {
					"set_attributes": {
						"advisor_pallet": "",
						"advisor_type": "",
						"advisor_price": "",
						"advisor_sort": ""
					},
					"type": "show_block",
					"block_names": ["ProductAdvisor-Answersr"],
					"title": "Start Over"
				  }
				]
			  }
			}
		  }
		]
	  }
	';
}
