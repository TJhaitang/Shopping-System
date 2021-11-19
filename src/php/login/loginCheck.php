<?php
include "../src/mysql.php";
include "../src/jwtTools.php";
$conn = connect();
$params = json_decode(file_get_contents("php://input"), true);
$user = $params['email'];
// $user="1319377413@qq.com";
$pswd = $params['password'];
// $pswd="123456";
$pswd = md5($pswd, false);
$code = $params['emailcode'];
$type=$params['type'];
$nowtime=time()-300;
//查询数据库
$sql="SELECT uid from ".(($type=="S")?"merchant":"member").",code where code.email ='".$user."' AND password = '".$pswd."' AND ".(($type=="S")?"merchant":"member").".email=code.email AND type='".$type."' AND phrase='".$code."' AND time>".$nowtime." ;";
$result=mysqli_query($conn,$sql);
$dt=mysqli_fetch_assoc($result);

if($dt!=false/*判断是否有结果*/){
    $DeleteSql="DELETE FROM code WHERE email='".$params['email']."';";
    $Dresult=mysqli_query($conn,$DeleteSql);
    $token=getToken($type,$user,$dt['uid']);
    echo json_encode(array("status"=>"success","token"=>$token));
}
else{
    echo json_encode(array("status" => "fail"));
}
