<?php
include "sql.php";
include "sendmail.php";

$conn = connect();
if ($conn)
    echo "<script>window.alert(\"1\")</script>";
else
    echo "<script>window.alert(\"0\")</script>";
if (isset($_POST["submit"]) && $_POST["submit"] == 'login' && $conn) {
    $user = $_POST['username'];
    $pswd = $_POST['password'];
    sendmail($user, "test", "testtt");
    header("location:user.php");
} else {
    echo "wrong!";
}
