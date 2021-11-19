<?php
include "../src/jwtTools.php";
include "../src/mysql.php";
$uid=getUidFromHttp("S");
// $uid="1";
$conn=connect();
//sql语句需要修改奶酪
$sql="SELECT uid,username,email,phone,addr,gender,signature,avatar FROM merchant WHERE uid=".$uid.";";
$result=mysqli_query($conn,$sql);
$info=mysqli_fetch_assoc($result);
echo json_encode($info);