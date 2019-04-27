<?php

(int)$priceAttribute = (!empty($_GET["price_for_flowers"]))?$_GET["price_for_flowers"]:0;

$priceAttribute = preg_replace('/[^0-9]/','',$priceAttribute);

echo '  
{
    "set_attributes": {
      "price_for_flowers": "'.$priceAttribute.'"
    }
}';
 