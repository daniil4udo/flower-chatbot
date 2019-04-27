<?php 

$sex = (!empty($_GET["sex"]))?$_GET["sex"]:"undefine";

if ($sex == "male" || $sex == "undefine") {
    $pic_url = "https://us.123rf.com/450wm/artfotodima/artfotodima1702/artfotodima170200105/71576014-beautiful-asian-florist-girls-making-bouquet-of-flowers-on-table-for-sale-against-floral-bokeh-backg.jpg?ver=6";
}
else {
    $pic_url = "https://hips.hearstapps.com/hbz.h-cdn.co/assets/17/08/480x500/nickbateman.png";
}

echo '
{
    "messages": [
      {
        "attachment": {
          "type": "image",
          "payload": {
            "url": "'. $pic_url .'"
          }
        }
      }
    ]
}
';