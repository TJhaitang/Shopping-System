<?php
include "../mysql.php";
$conn = connect();
$params = json_decode(file_get_contents("php://input"), true);
$user = $params['username'];
$pswd = $params['password'];
$pswd = md5($pswd, false);
$code = $params['emailcode'];

//查询数据库

echo json_encode(array("1" => "success", "2" => $pswd));
