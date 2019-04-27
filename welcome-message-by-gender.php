<?php

$sex = (!empty($_GET["sex"]))?$_GET["sex"]:"undefine";

if ( $sex == "male" ) {
    $message = "Hi, Handsome 😍! My name is {{bot_name}}. Try super fast way to order and send gifts with me. Take a journey to Your effortless shopping experience";
    $bot_name = "Laila";
}
else if ( $sex == "female" ){
    $message = "Hello, Gorgeous 😍! I'm {{bot_name}}. Become a Queen of Shopping with me. Let Artificial Intelegence enhance your shopping experience";
    $bot_name = "Kareem";
}
else {
    $message = "Hi, {{first name}}! Nice to meet you. Welcome to our Flower Shop. 🌷 I'm your virtual gifting assistant!";
    $bot_name = "";
}
echo '
{
    "set_attributes":
        {"bot_name": "' . $bot_name . '"},
    "messages": [
        {"text": "'. $message .'"}
    ]
}
';