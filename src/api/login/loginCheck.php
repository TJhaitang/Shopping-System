<?php
include "../sql.php";
$conn = connect();
if ($conn == false) {
    die("Wrong!");
}
$params = json_decode(file_get_contents("php://input"), true);
$user = $params['username'];
echo json_encode(array("123" => "qwe", "456" => "dpp"));
