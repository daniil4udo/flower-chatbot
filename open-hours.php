<?php

/**
 * Based on the following business hours:
 * (Note : I setup the hours for each day if they carry-over)
 * everyday is open from 09:00 AM - 12:00 AM
 * Sun/Sat open extra from 12:00 AM - 01:00 AM
 */

$status = 'Unfortunately next delivery slot avaliable only for tomorrow. But you can place your order today.';

$tz = 'Asia/Dubai'; // your required location time zone.
$timestamp = time();
$dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
$dt->setTimestamp($timestamp); //adjust the object to correct timestamp


if( $dt->format('H') < 15 ) {
  $status = 'Yes! You can get you order today!';
} 



echo '{
    "messages": [
      {
        "text": " '.$status.' "
      },
      {
        "text": "For more information visit Shipping & Delivery support",
        "quick_replies": [
          {
            "title": "Delivery Methods",
            "url": "https://jsonblob.com/api/1afa7a6a-ce18-11e8-a72c-a9ddeeaaa7a5",
            "type": "json_plugin_url"
          },
          {
            "title": "Delivery Policy",
            "url": "https://jsonblob.com/api/ae90c46b-ce18-11e8-a72c-e32a61de67c3",
            "type": "json_plugin_url"
          },
          {
            "title": "Yalla Order Gift",
            "block_names": ["Choose how to start"]
          }
        ]
      }
    ]
  }';
