<?php

/*
retrive quicklinks 
 */

$productPrice = [
  '99' => 'FloralEcomLLC_18084',
  '139' => 'FloralEcomLLC_18234',
  '159' => 'FloralEcomLLC_18672',
  '179' => 'FloralEcomLLC_18682',
  '189' => 'FloralEcomLLC_18401',
  '195' => 'FloralEcomLLC_18664',
  '199' => 'FloralEcomLLC_18683',
  '219' => 'FloralEcomLLC_18684',
  '229' => 'FloralEcomLLC_18685',
  '239' => 'FloralEcomLLC_18686',
  '249' => 'FloralEcomLLC_18548',
  '259' => 'FloralEcomLLC_18687',
  '269' => 'FloralEcomLLC_18688',
  '279' => 'FloralEcomLLC_18689',
  '289' => 'FloralEcomLLC_18690',
  '299' => 'FloralEcomLLC_18235',
  '325' => 'FloralEcomLLC_18573',
  '339' => 'FloralEcomLLC_18691',
  '349' => 'FloralEcomLLC_18236',
  '359' => 'FloralEcomLLC_18692',
  '369' => 'FloralEcomLLC_18693',
  '379' => 'FloralEcomLLC_18574',
  '399' => 'FloralEcomLLC_18237',
  '449' => 'FloralEcomLLC_18694',
  '459' => 'FloralEcomLLC_18549',
  '599' => 'FloralEcomLLC_18238',
  '899' => 'FloralEcomLLC_18575',
  '1199' => 'FloralEcomLLC_18681',
];

(int)$priceAttribute = (!empty($_GET["price_for_flowers"]))?$_GET["price_for_flowers"]:0;

foreach ($productPrice as $k => $v) {
    //echo "\$a[$k] => $v.\n";

    if ( $priceAttribute == $k ) {
        $linkValue = $v;
        break;
    }
    
}

echo '
{
    "messages": [
      {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": "Now you can pay AED {{price_for_flowers}} simply followed by the link!",
            "buttons": [
                {
                  "type": "web_url",
                  "url": "https://secure.telr.com/gateway/ql/'. $linkValue .'.html",
                  "title": "Pay with Card"
                }
            ]
          }
        }
      }
    ]
  }
';