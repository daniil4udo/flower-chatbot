<?php

$sleep = isset($_GET['sleep']) ? $_GET['sleep'] : 0;
$goToBlock = isset($_GET['goToBlock']) ? $_GET['goToBlock'] : 0;

if ( !empty($sleep) & !empty($goToBlock) )
{
    sleep($sleep);
}

echo '
{
    "redirect_to_blocks": ["'.$goToBlock.'"]
  }
';

