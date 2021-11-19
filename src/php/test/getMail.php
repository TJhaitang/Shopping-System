<?php
include "../src/sendmail.php";
include "../src/mysql.php";

$params = json_decode(file_get_contents("php://input"), true);
$user = $params['username'];
$type=$params['type'];
// $user=$_POST['username'];
// echo $user;
// $user="1319377413@qq.com";
//这里还需要判断$user是不是邮箱，如果是用户id则需要从数据库中取邮箱
$time = time(); //返回时间戳
$code = rand(123456, 987654);
//这里需要将用户名、验证码、时间戳放到数据库中
//同时需要检查数据库中有没有这个用户的其他验证码，如果有则删掉
$conn=connect();
//删除已有的该用户验证码数据，增加现有的
$sql1="DELETE FROM code WHERE type='".$type."' AND email = '".$user."';";
$sql2="INSERT INTO code(phrase,time,email,type) values ('".$code."',".$time.",'".$user."','S');";
// echo $sql1."<br/>".$sql2;
$result1=mysqli_query($conn,$sql1);

$result2=mysqli_query($conn,$sql2);

$send=sendmail($user, "登录验证码", "你的验证码为:" . $code);
echo json_encode(array("status"=>$send?"success":"fail"));
