<?php
include "../src/jwtTools.php";
include "../src/mysql.php";
$uid=getUidFromHttp("V");
$conn=connect();
//sql语句还没写奶酪
$sql="";//还没写
$result=mysqli_query($conn,$sql);
$info=mysqli_fetch_assoc($result);
echo json_encode($info);