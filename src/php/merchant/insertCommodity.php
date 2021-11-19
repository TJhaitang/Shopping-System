<?php
include "../src/jwtTools.php";

$uid=getUidFromHttp("S");
$params=json_decode(file_get_contents("php://input"), true);

//没有进行测试奶酪
if(insertIntoWherever("commodity",$params)){
    echo json_encode(array("status"=>"success"));
}
else{
    echo json_encode(array("status"=>"fail"));
}