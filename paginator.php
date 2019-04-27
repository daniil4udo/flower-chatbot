<?php

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
		  
		$url= "https://dubaifloral.com/bot-assets/paginator.php";
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
                "block_names": ["Collections"]
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

  //$categoryName = (!empty($_GET["categoryName"]))?$_GET["categoryName"]:0;
  $categoryName = isset($_GET['categoryName']) ? $_GET['categoryName'] : 0;
  
  if (stripos($categoryName,"Luxury") !== false) {
    $productList = array(
    0=> array('title' => 'Secret Garden','subtitle' => 'Contains: Oriental Lily, Protea / Hydrangea, Roses, Eucalyptus, Thistles','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599650/bouquet_8_main_2_rp9bsl.jpg','button_lable' => '459'),
    1=> array('title' => 'Tiptop','subtitle' => 'Contains: 24 pcs. Peonies','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987983/Bot-Assets/21-1199-.jpg','button_lable' => '899'),
    2=> array('title' => 'Perfect Mix','subtitle' => 'Contains: Roses, Mokara Orchid, Cymbidium Orchids, Succulent, Chrysanthemum, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599735/bouquet_13_main_2_jwcvcu.jpg','button_lable' => '459'),
    3=> array('title' => 'Simple Sophistication','subtitle' => 'Contains: Roses, Lavender','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599628/bouquet_10_main_2_sueatq.jpg','button_lable' => '399'),
    4=> array('title' => 'Soft Innocence','subtitle' => 'Contains: Roses, Lisianthus, Pittosporum','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599417/bouquet_2_main_2_dmcrvc.jpg','button_lable' => '399'),
    5=> array('title' => 'Coral Reef','subtitle' => 'Contains: Cymbidium Orchids, Celosia, Leucospermum, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599588/bouquet_6_main_2_im88v7.jpg','button_lable' => '349'),
    6=> array('title' => 'Harmony','subtitle' => 'Contains: Hydrangea, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599722/bouquet_14_main_2_ljra8t.jpg','button_lable' => '349'),
    7=> array('title' => 'Colour Explosion','subtitle' => 'Contains: Roses, Carnation, Leucospermum','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599699/bouquet_11_main_2_vzkxhn.jpg','button_lable' => '349'),
    8=> array('title' => 'Bonny Highland','subtitle' => 'Contains: Big Succulent, Carnation, Thistles , Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599576/bouquet_7_main_2_mtakkd.jpg','button_lable' => '399'),
    9=> array('title' => 'Modern Classic','subtitle' => 'Contains: Roses, Thistles, Eucalyptus, Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599794/bouquet_15_main_2_kcctcw.jpg','button_lable' => '459'),
    10=> array('title' => 'Superlative','subtitle' => 'Contains: 21 pcs. Peonies','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987956/Bot-Assets/18-1199-.jpg','button_lable' => '899'),
    11=> array('title' => 'Prince Charming','subtitle' => 'Contains: Protea / Hydrangea, Roses, Delphinium, Matthiola, Thistles , Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599641/bouquet_9_main_2_vhlbql.jpg','button_lable' => '459'),
    12=> array('title' => 'Grace','subtitle' => 'Contains: Hydrangea, Hypericum, Roses, Misty Blue','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599687/bouquet_12_main_2_pe7hng.jpg','button_lable' => '399'),
    13=> array('title' => 'Transcendent','subtitle' => 'Contains: 20 pcs. Peonies','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987991/Bot-Assets/17-1199-.jpg','button_lable' => '899'),
    14=> array('title' => 'Surpassing','subtitle' => 'Contains: 22 pcs. Peonies','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987975/Bot-Assets/19-1199.jpg','button_lable' => '899'),
    15=> array('title' => 'Classic Elegance','subtitle' => 'Contains: Roses, Cymbidium Orchids, Chrysanthemum, China Grass','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599508/bouquet_5_main_2_tfmma9.jpg','button_lable' => '349'),
    16=> array('title' => 'Lush','subtitle' => 'Contains: Succulent, Hydrangea, Misty Blue','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599519/bouquet_4_main_2_odpvqu.jpg','button_lable' => '399'),
    17=> array('title' => 'Majestic Essence','subtitle' => 'Contains: Hydrangea, Roses, Mokara Orchid, Eucalyptus, Aralia','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599404/bouquet_3_main_2_ofsdg9.jpg','button_lable' => '459'),
    18=> array('title' => 'Natures Purity','subtitle' => 'Contains: Hydrangea, Roses, Eucalyptus, Aralia.','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599369/bouquet_1_main_mhehwb.jpg','button_lable' => '399'),
    );}// End of Luxury
    
    else if (stripos($categoryName,"Anniversary") !== false) {
    $productList = array(
    0=> array('title' => 'Say It With Flowers','subtitle' => 'Contains:Oriental White - 3 pcs. Roses Red - 8 pcs. Carnation Red - 8 pcs. Misty Blue - 2 pcs. Vase - 1 pcs. ','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551542/Birthday-210aed_erlltb.jpg','button_lable' => '259'),
    1=> array('title' => 'Pink N White','subtitle' => 'Contains:Mums White - 8 pcs. Carnation Pink - 8 pcs. Roses Pink - 10 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551583/baby-girl-175aed_ihynyw.jpg','button_lable' => '349'),
    2=> array('title' => 'Perfect Mix','subtitle' => 'Contains:Lisianthus Pink - 6 pcs. Red Roses - 10 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552686/anniversary-175aed_o0m5ut.jpg','button_lable' => '219'),
    3=> array('title' => 'Stems From Heaven','subtitle' => 'Contains:Lisianthus Pink - 5 pcs. Roses Red - 10 pcs. Purple Rose - 10 pcs. Mums White - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552696/anniversarry-245aed_b6ro9y.jpg','button_lable' => '299'),
    4=> array('title' => 'Garden Fresh','subtitle' => 'Contains:Deco White - 3 pcs. Gerbera Pink - 5 pcs. Roses Pink - 10 pcs. Mums Green - 8 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551580/baby-girl-230aed_qbcy4m.jpg','button_lable' => '269'),
    5=> array('title' => 'Sophisticated Style','subtitle' => 'Contains:Lisianthus Pink - 5 pcs. Roses Pink - 10 pcs. Mums White - 5 pcs. Orchid Pink - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551573/baby-Girl-210aed2_nryi5w.jpg','button_lable' => '289'),
    6=> array('title' => 'Rare Beauty','subtitle' => 'Contains:Roses White - 10 pcs. Blue Orchid - 10 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552672/baby-boy-175aed_oeos0k.jpg','button_lable' => '229'),
    7=> array('title' => 'Fynbos Mix','subtitle' => 'Contains:Mix - 2 Bunches pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551529/south-african-flowers-250aed_vrdarp.jpg','button_lable' => '249'),
    8=> array('title' => 'A Special Lady','subtitle' => 'Contains:Lisianthus Pink - 5 pcs. Roses Pink - 10 pcs. Mums White - 5 pcs. Orchid Pink - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552631/baby-Girl-210aed_m9mmvx.jpg','button_lable' => '289'),
    9=> array('title' => 'Best Choice','subtitle' => 'Contains:Roses Peach - 10 pcs. Oriental White - 3 pcs. Deco Green - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551525/getwell20soon-210aed_p3aev1.jpg','button_lable' => '249'),
    10=> array('title' => 'Brighten Your Day','subtitle' => 'Contains:Roses Peach - 10 pcs. Oriental White - 3 pcs. Deco Green - 5 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551535/getwell-soon-combo-385aed_wro4qs.jpg','button_lable' => '359'),
    11=> array('title' => 'Simply Beautiful','subtitle' => 'Contains:Oriental White - 2 pcs. Orchid Blue - 7 pcs. Mums Green - 5 pcs. Carnation White - 8 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552648/baby-boy-210aed_fzkpvl.jpg','button_lable' => '269'),
    12=> array('title' => 'White N Green','subtitle' => 'Contains:Roses Peach - 10 pcs. Oriental White - 3 pcs. Deco Green - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551532/getwell-soon-210aed_bc6gpf.jpg','button_lable' => '249'),
    13=> array('title' => 'Elegance In A Vase','subtitle' => 'Contains:Oriental White - 3 pcs. Roses Red - 8 pcs. Carnation Red - 8 pcs. Misty Blue - 2 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551553/Birthday-210aed2_gb8mhp.jpg','button_lable' => '259'),
    14=> array('title' => 'Mums The Word','subtitle' => 'Contains:Oriental White - 3 pcs. Roses White - 10 pcs. Mums Blue - 5 pcs. Misty Blue - 2 pcs. Mums White - 5 pcs. Vase - 1','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552656/baby-boy-245aed_b0fjih.jpg','button_lable' => '279'),
    );}
    
    else if (stripos($categoryName,"Birthday") !== false) {
    $productList = array(
    0=> array('title' => 'Exclusive','subtitle' => 'Contains:Roses Peach - 10 pcs. Oriental White - 3 pcs. Deco Green - 5 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987941/Bot-Assets/10-349-.jpg','button_lable' => '349'),
    1=> array('title' => 'Superior ','subtitle' => 'Contains: Hydrangea, Lisianthus, Mums, Roses, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987944/Bot-Assets/13-299-.jpg','button_lable' => '299'),
    2=> array('title' => 'Classy','subtitle' => 'Contains:Mums White - 5 pcs. Roses Red - 10 pcs. Gerbera Pink - 7 pcs. Soft Toy - 1 pcs. Chocolate Cake - 1 pcs. Vase - 1Pc.','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987934/Bot-Assets/4-249-.jpg','button_lable' => '249'),
    3=> array('title' => 'Ultimate Birthday Combo','subtitle' => 'Contains: Lisianthus, Roses, Greenery','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551546/birthday-combo-495aed_hlkmvv.jpg','button_lable' => '599'),
    4=> array('title' => 'Peachy','subtitle' => 'Contains: Lisianthus, Solid Aster, Celosia, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988110/Bot-Assets/39-899-.jpg','button_lable' => '899'),
    5=> array('title' => 'Beautiful','subtitle' => 'Contains: Hydrangea, Roses, Alstromeria, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987934/Bot-Assets/2-299-.jpg','button_lable' => '299'),
    6=> array('title' => 'Always Yours Birthday Combo','subtitle' => 'Contains:Mums White - 5 pcs. Roses Red - 10 pcs. Carnation Red - 10 pcs. Soft Toy - 1 pcs. Helium Balloons - 3 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551556/birthda-combo-300_tuxjsv.jpg','button_lable' => '339'),
    7=> array('title' => 'Spruce','subtitle' => 'Contains: Cymbidium, Spray Roses, Roses, Eucalyptus, Wheat','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987942/Bot-Assets/12-399-.jpg','button_lable' => '399'),
    8=> array('title' => 'Divine','subtitle' => 'Contains: Hydrangea, Roses, Alstromeria, Misty Blue, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987940/Bot-Assets/9-199-.jpg','button_lable' => '199'),
    9=> array('title' => 'Delicate','subtitle' => 'Contains:Oriental White - 3 pcs. Roses Red - 8 pcs. Carnation Red - 8 pcs. Misty Blue - 2 pcs. Soft Toy - 1 pcs. Helium Balloons - 3 pcs. Vase - 1Pc.','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987939/Bot-Assets/8-299-.jpg','button_lable' => '299'),
    10=> array('title' => 'Brighten Your Day','subtitle' => 'Contains: Roses, Lisianthus, Eucalyptus','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551535/getwell-soon-combo-385aed_wro4qs.jpg','button_lable' => '359'),
    11=> array('title' => 'Nailing','subtitle' => 'Contains: Lisianthus, Spray Rose, Roses, Orchid White, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988033/Bot-Assets/37-299-.jpg','button_lable' => '299'),
    12=> array('title' => 'Noble','subtitle' => 'Contains: Alstromeria, Celosia, Lisianthus, Buplereum','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987941/Bot-Assets/11-299-.jpg','button_lable' => '299'),
    13=> array('title' => 'Clinking','subtitle' => 'Contains: Roses, Lavender, Hypericum, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987937/Bot-Assets/5-249-.jpg','button_lable' => '249'),
    14=> array('title' => 'Happy Ducky Birthday Combo','subtitle' => 'Contains: Spray Rose, Lisianthus, Orchid White, Greenery','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551563/birthday-combo2-405_lp6k6a.jpg','button_lable' => '369'),
    );}
    
    else if (stripos($categoryName,"Newborn Gifts") !== false) {
    $productList = array(
    0=> array('title' => 'Baby Girl Duck Combo','subtitle' => 'Contains:Deco White - 3 pcs. Gerbera Pink - 5 pcs. Roses Pink - 10 pcs. Mums Green - 8 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552642/baby-girl-combo2-405aed_donxon.jpg','button_lable' => '379'),
    1=> array('title' => 'Pink N White Bunny Combo','subtitle' => 'Contains:Mums White - 8 pcs. Carnation Pink - 8 pcs. Helium Balloons - 3 pcs. Roses Pink - 10 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552634/baby-girl-combo6-300aed_ipxixz.jpg','button_lable' => '349'),
    2=> array('title' => 'Pink N White Duck Combo','subtitle' => 'Contains:Mums White - 8 pcs. Carnation Pink - 8 pcs. Roses Pink - 10 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538551576/baby-girl-combo5-300aed_f1ikbu.jpg','button_lable' => '349'),
    3=> array('title' => 'Baby Girl Bunny Combo','subtitle' => 'Contains:Deco White - 3 pcs. Gerbera Pink - 5 pcs. Roses Pink - 10 pcs. Mums Green - 8 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552645/baby-girl-combo-405aed_vs5rad.jpg','button_lable' => '379'),
    4=> array('title' => 'Baby Girl Ele Combo','subtitle' => 'Contains:Deco White - 3 pcs. Gerbera Pink - 5 pcs. Roses Pink - 10 pcs. Mums Green - 8 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552638/baby-girl-combo3-405aed_jcgt89.jpg','button_lable' => '379'),
    5=> array('title' => 'Baby Boy Ele Combo','subtitle' => 'Contains:Oriental White - 3 pcs. Roses White - 10 pcs. Mums Blue - 5 pcs. Misty Blue - 2 pcs. Mums White - 5 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552664/baby-boy-combo3-385aed_al1w88.jpg','button_lable' => '379'),
    6=> array('title' => 'My BoyS Ele Combo','subtitle' => 'Contains:Roses White - 10 pcs. Blue Orchid - 10 pcs. Soft Toy - 1 pcs. Helium Balloons - 3 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552668/baby-boy-combo3-300aed_oa1kpp.jpg','button_lable' => '325'),
    7=> array('title' => 'My BoyS Bunny','subtitle' => 'Contains:Roses White - 10 pcs. Blue Orchid - 10 pcs. Soft Toy - 1 pcs. Helium Balloons - 3 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552678/baby-boy-combo2-300aed_vk28jw.jpg','button_lable' => '325'),
    8=> array('title' => 'Baby Boy Bunny Combo','subtitle' => 'Contains:Oriental White - 3 pcs. Roses White - 10 pcs. Mums Blue - 5 pcs. Misty Blue - 2 pcs. Mums White - 5 pcs. Helium Balloons - 3 pcs. Soft Toy - 1 pcs. Vase - 1Pc.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1538552653/baby-boy-combo4-385aed_jkpe7j.jpg','button_lable' => '379'),
    );}
    
    else if (stripos($categoryName,"BestSellers") !== false) {
    $productList = array(
    0=> array('title' => 'Ocean Blue','subtitle' => 'Contains: 10 pcs. Blue Orchids','url' => 'https://res.cloudinary.com/https-flowers4u-ae/image/upload/v1540199055/SER_8506.jpg','button_lable' => '159'),
    1=> array('title' => 'Orchid Delight','subtitle' => 'Three Different Mokara Orchids In A Vase, Stylish, Beautiful And Stunning.','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1519811133/Orchid-Delight_gy3gws.jpg','button_lable' => '179'),
    2=> array('title' => 'Just Lily’S','subtitle' => 'Contains: 10 pcs. Stems Of These Gorgeous Flowers','url' => 'http://res.cloudinary.com/upscale-and-posh/image/upload/v1519811140/Just-Lilys_f3kjae.jpg','button_lable' => '239'),
    3=> array('title' => 'Elegance','subtitle' => 'Contains: L. Purple Rose, Purple Spray Roses And S Fern','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1516622871/99-3-Elegance_bi6ftr.jpg','button_lable' => '139'),
    4=> array('title' => 'My Heart Is Yours','subtitle' => 'Contains: Red Rose, Alstroemeria White, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1516783121/V-7-My-heart-is-yours_pqkrpm.jpg','button_lable' => '259'),
    5=> array('title' => 'Classic Elegance','subtitle' => 'Contains: Roses, Cymbidium Orchids, Chrysanthemum, China Grass (See Options To Know Quantity).','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599508/bouquet_5_main_2_tfmma9.jpg','button_lable' => '349'),
    6=> array('title' => 'Bonny Highland','subtitle' => 'Contains: Big Succulent, Carnation, Thistles , Eucalyptus (See Options To Know Quantity).','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/bouquet_7_main_d3fnhc.jpg','button_lable' => '399'),
    7=> array('title' => 'Simple Sophistication','subtitle' => 'Contains: Roses, Lavender (See Options To Know Quantity).','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599631/bouquet_10_main_tlbczs.jpg','button_lable' => '399'),
    8=> array('title' => 'Always and Forever','subtitle' => 'Contains: Roses White, Lisianthus White, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/l_Upscale_Posh-Flowers_cehaq0\,o_50\,x_-200\,y_-200/v1516783128/V-5-Always-and-forever_xqlccz.jpg','button_lable' => '319'),
    );}
    
    else if (stripos($categoryName,"Roses") !== false) {
    $productList = array(
    0=> array('title' => 'Luxury 24 Pink Roses','subtitle' => 'Contains: Luxury 24 pcs. Pink Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196579/pink-roses-24_wfkhes.jpg','button_lable' => '199'),
    1=> array('title' => 'Luxury 36 Yellow Roses','subtitle' => 'Contains: Luxury 36 pcs. Yellow Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196582/yellow-roses-36_d9scmx.jpg','button_lable' => '239'),
    2=> array('title' => 'Luxury 36 Red Roses','subtitle' => 'Contains: 36 Pcs. Of Luxury Red Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196583/red-roses-36_kvjofl.jpg','button_lable' => '239'),
    3=> array('title' => 'Luxury 24 Yellow Roses','subtitle' => 'Contains: Luxury 24 pcs. Yellow Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196582/yellow-roses-24_axyl9a.jpg','button_lable' => '199'),
    4=> array('title' => 'Luxury 48 Pink Roses','subtitle' => 'Contains: Luxury 48 pcs. Pink Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196579/pink-roses-48_qj371i.jpg','button_lable' => '349'),
    5=> array('title' => 'Luxury 48 Peach Roses','subtitle' => 'Contains: Luxury 48 pcs. Peach Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196582/peach-roses-48_z3dyde.jpg','button_lable' => '349'),
    6=> array('title' => 'Luxury 100 Mixed Roses','subtitle' => 'Contains: Luxury 100 Mixed Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196577/mixed-roses-100_ufvn7i.jpg','button_lable' => '599'),
    7=> array('title' => 'Luxury 24 White Roses','subtitle' => 'Contains: Luxury 24 pcs. White Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196581/whte-roses-24_hi8vqq.jpg','button_lable' => '199'),
    8=> array('title' => 'Luxury 48 Red Roses','subtitle' => 'Contains: 48 Pcs. Of Luxury Red Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196580/red-roses-48_yc0vkx.jpg','button_lable' => '349'),
    9=> array('title' => 'Luxury 24 Red Roses','subtitle' => 'Contains: 24 Pcs. Of Luxury Red Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196579/red-roses-24_mngocu.jpg','button_lable' => '199'),
    10=> array('title' => 'Luxury 36 Peach Roses','subtitle' => 'Contains: Luxury 36 pcs. Peach Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196578/peach-roses-36_tepyx0.jpg','button_lable' => '239'),
    11=> array('title' => 'Luxury 24 Mixed Roses','subtitle' => 'Contains: Luxury 24 pcs. Mixed Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196580/mix-roses-24_eqpjoa.jpg','button_lable' => '199'),
    12=> array('title' => 'Luxury 36 White Roses','subtitle' => 'Contains: Luxury 36 pcs. White Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196583/whte-roses-36_nie5bx.jpg','button_lable' => '239'),
    13=> array('title' => 'Luxury 48 White Roses','subtitle' => 'Contains: Luxury 48 pcs. White Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196583/whte-roses-48_faxvqy.jpg','button_lable' => '349'),
    14=> array('title' => 'Luxury 48 Mixed Roses','subtitle' => 'Contains: Luxury 48 pcs. Mixed Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196583/mix-roses-48_oih5nl.jpg','button_lable' => '349'),
    15=> array('title' => 'Luxury 24 Peach Roses','subtitle' => 'Contains: Luxury 24 pcs. Peach Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196578/peach-roses-24_w2eyzq.jpg','button_lable' => '199'),
    16=> array('title' => 'Luxury 36 Mixed Roses','subtitle' => 'Contains: Luxury 36 pcs. Mixed Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540196580/mix-roses-36_l1tyiz.jpg','button_lable' => '239'),
    );}
    
    else if (stripos($categoryName,"Get Well") !== false) {
    $productList = array(
    0=> array('title' => 'Topnotch','subtitle' => 'Contains: Mathiola, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988000/Bot-Assets/22-199-.jpg','button_lable' => '199'),
    1=> array('title' => 'Fantastical','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988093/Bot-Assets/46-199-.jpg','button_lable' => '199'),
    2=> array('title' => 'Grand','subtitle' => 'Contains: 40 pcs. Tulips','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988112/Bot-Assets/48-449-.jpg','button_lable' => '449'),
    3=> array('title' => 'Graceful','subtitle' => 'Contains: 40 pcs. Tulips','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988103/Bot-Assets/47-449-.jpg','button_lable' => '449'),
    4=> array('title' => 'Stylish','subtitle' => 'Contains: Lisianthus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988030/Bot-Assets/31-199-.jpg','button_lable' => '199'),
    5=> array('title' => 'Superb','subtitle' => 'Contains: Mathiola','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988089/Bot-Assets/34-199-.jpg','button_lable' => '199'),
    6=> array('title' => 'Fantastic','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988095/Bot-Assets/45-199-.jpg','button_lable' => '199'),
    7=> array('title' => 'Prime','subtitle' => 'Contains: Delphinium','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988001/Bot-Assets/28-249-.jpg','button_lable' => '249'),
    8=> array('title' => 'Posh','subtitle' => 'Contains: 20 pcs. Tulips, Lavender','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988103/Bot-Assets/49-299-.jpg','button_lable' => '299'),
    9=> array('title' => 'Genteel','subtitle' => 'Contains: Gerbera, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988066/Bot-Assets/40-399-.jpg','button_lable' => '399'),
    10=> array('title' => 'Palmary','subtitle' => 'Contains: Oriental Pink, Hydrangea, Eucalyptus','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988047/Bot-Assets/38-249-.jpg','button_lable' => '249'),
    11=> array('title' => 'Exquisite','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988084/Bot-Assets/44-199-.jpg','button_lable' => '199'),
    );}
    
    else if (stripos($categoryName,"Love n Romance") !== false) {
    $productList = array(
    0=> array('title' => 'Elegant','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988062/Bot-Assets/41-199-.jpg','button_lable' => '199'),
    1=> array('title' => 'Spirituel','subtitle' => 'Contains: 10 pcs. Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988029/Bot-Assets/27-139-.jpg','button_lable' => '139'),
    2=> array('title' => 'Soigne','subtitle' => 'Contains: 10 pcs. Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987997/Bot-Assets/23-139-.jpg','button_lable' => '139'),
    3=> array('title' => 'Excellent','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988085/Bot-Assets/42-199-.jpg','button_lable' => '199'),
    4=> array('title' => 'Nailing','subtitle' => 'Contains: Hydrangea, Lisianthus, Mums, Roses, Greenery','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988033/Bot-Assets/37-299-.jpg','button_lable' => '299'),
    5=> array('title' => 'Ripping','subtitle' => 'Contains: 20 pcs. Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988023/Bot-Assets/29-199-.jpg','button_lable' => '199'),
    6=> array('title' => 'Rare','subtitle' => 'Contains: Hyacinth','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988031/Bot-Assets/32-199-.jpg','button_lable' => '199'),
    7=> array('title' => 'Peachy','subtitle' => 'Contains: Cymbidium, Spray Roses, Roses, Eucalyptus, Wheat','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988110/Bot-Assets/39-899-.jpg','button_lable' => '899'),
    8=> array('title' => 'Upscale','subtitle' => 'Contains: 3 pcs. Hydrangea','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988101/Bot-Assets/43-199-.jpg','button_lable' => '199'),
    9=> array('title' => 'Sophisticated','subtitle' => 'Contains: 10 pcs. Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987986/Bot-Assets/24-139-.jpg','button_lable' => '139'),
    10=> array('title' => 'Slick','subtitle' => 'Contains: Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988035/Bot-Assets/30-139-.jpg','button_lable' => '139'),
    11=> array('title' => 'Sovereign','subtitle' => 'Contains: 15 pcs. Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988010/Bot-Assets/25-139-.jpg','button_lable' => '199'),
    12=> array('title' => 'Smug','subtitle' => 'Contains: Roses, Cymbidium','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988041/Bot-Assets/36-249-.jpg','button_lable' => '249'),
    13=> array('title' => 'Splendid','subtitle' => 'Contains: Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540987977/Bot-Assets/16-199-.jpg','button_lable' => '139'),
    14=> array('title' => 'Spanking','subtitle' => 'Contains: 10 pcs. Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988005/Bot-Assets/26-139-.jpg','button_lable' => '139'),
    15=> array('title' => 'Smashing','subtitle' => 'Contains: Spray Roses','url' => 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1540988051/Bot-Assets/35-139-.jpg','button_lable' => '139'),
    );}

	  // If we have an array with items
	if (count($productList)) {

		// Create the pagination object
		$pagination = new pagination($productList, (isset($_GET['page']) ? $_GET['page'] : 1), 7);
		// Decide if the first and last links should show
		$pagination->setShowFirstAndLast(false);
		// Parse through the pagination class
		$productPages = $pagination->getResults();
		// If we have items 
		if (count($productPages) != 0) {

		  // Create the page numbers
		  
		  
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
                        "set_attributes": {"product": "'.$productArray['title'].'"},
                        "type": "show_block",
                        "block_names": ["AED-setPrice"],
                        "title": "Buy for AED '.$productArray['button_lable'].'"
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
