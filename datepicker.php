<?php

    (int)$currentpage = (!empty($_GET["currentpage"]))?$_GET["currentpage"]:0;
    (int)$nextpage = $currentpage + 1;
    (int)$prevpage = $currentpage - 1;
    (int)$dayToShow = 7;
   
    $url= "https://dubaifloral.com/bot-assets/datepicker.php"; //url for datepicker.php
    //$urloutput = "https://dubaifloral.com/bot-assets/showtext.php"; //url for showtext.php
    
    //show date using quick reply
    echo '{
      "messages": [
        {
          "text":  "Please select DELIVERY date?",
          "quick_replies": [';
    if ($currentpage > 0)      
      echo '{ "title":"<<", "url": "'.$url.'?currentpage='.$prevpage.'", "type":"json_plugin_url" },';
    
    $m = date("m");
    $d = date("d")+$currentpage * $dayToShow;
    $y = date("Y");
    //
    $tz = 'Asia/Dubai'; // your required location time zone.
    $timestamp = time();
    $dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
    $dt->setTimestamp($timestamp); //adjust the object to correct timestamp
    
    //if( $dt->format('H') > 15 ) {
      $d += 1;
    //} 
    //
    for( $i = 0; $i < $dayToShow; $i++ ){
        
        echo    '{
                  "title":"'. date('F d, D',mktime(0,0,0,$m,($d+$i),$y)) .'",
                  "set_attributes":{"delivery_date": "'. date('F d, D',mktime(0,0,0,$m,($d+$i),$y)) .'"}
                }';
                if ($counter < $dayToShow) {
                    echo ",";
                }  
    }
	
  echo '{ "title":">>", "url": "'.$url.'?currentpage='.$nextpage.'", "type":"json_plugin_url" } 
  ';

    //close quick reply
        echo '        
                  ]
                }
              ]
            }';
?>
    
