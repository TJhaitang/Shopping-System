<?php
include "../src/mysql.php";
$params=json_decode(file_get_contents("php://input"), true);
$conn=connect();
$type=$params['type'];

$selectSql="SELECT * from ".($type=="S"?"merchant":"member")." WHERE email='".$params['email']."';";

$result1=mysqli_query($conn,$selectSql);
$dt=mysqli_fetch_assoc($result);

$codeSql="SELECT * from code WHERE email='".$params['email']."' AND phrase='".$params['code']."' AND time>".(time()-300)." ;";

$result2=mysqli_query($conn,$codeSql);
$dt2=mysqli_fetch_assoc($result2);

if($dt){
    echo json_encode(array("status"=>"EmailAlreadyExist"));
}
else if(!$dt2){
    echo json_encode(array("status"=>"CodeError"));
}
else{
$insertSql="INSERT INTO ".($type=="S"?"merchant":"member").
    " (password,name,email,province,identity,username".
    ($params['phone']?",phone":"").
    ($params['addr']?",addr":"").
    ($params['gender']?",gender":"").
    ($params['signature']?",signature":"").
    ") VALUES ('".
    md5($params['password'])."'".
    ",'".$params['name']."'".
    ",'".$params['email']."'".
    ",'".$params['province']."'".
    ",'".$params['identity']."'".
    ",'".($params['username']?$params['username']:($type=="S"?"大灰狼":"小白兔"))."'".
    ($params['phone']?(",'".$params['phone']."'"):"").
    ($params['addr']?(",'".$params['addr']."'"):"").
    ($params['gender']?(",'".$params['gender']."'"):"").
    ($params['signature']?(",'".$params['signature']."'"):"").");";

$result2=mysqli_query($conn,$insertSql);

echo json_encode(array("status"=>"success"));
}