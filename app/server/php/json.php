<?php
header('Access-Control-Allow-Origin:*');
header("Content-type:text/html;charset=UTF-8");

$json=file_get_contents("../json/detallPages.json");
    $json=json_decode($json);
		$json = json_encode($json);
    //var_dump($json);
    echo $json;



?>