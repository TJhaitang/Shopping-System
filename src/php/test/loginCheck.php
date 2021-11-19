<?php
include "../mysql.php";
$conn =connect();
$user="1319377413@qq.com";
$pswd=md5("123456",false);
$code=730076;
$type="S";
$nowtime=time()-300;
$sql="SELECT uid from ".(($type=="S")?"merchant":"member").",code where code.email ='".$user."' AND password = '".$pswd."' AND ".(($type=="S")?"merchant":"member").".email=code.email AND type='".$type."' AND phrase='".$code."' AND time>".$nowtime." ;";
echo $sql;
$result=mysqli_query($conn,$sql);
$dt=mysqli_fetch_assoc($result);

if($dt!=false/*判断是否有结果*/){
    if($type=="S"){
        echo json_encode(array("status"=>"success"));
    }
    else if($type=="V"){

        echo json_encode(array("status"=>"success"));
    }
}
else{
    echo json_encode(array("status" => "fail"));
}
