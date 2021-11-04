<?php
function connect()
{
    $conn = mysqli_connect("60.205.226.43", "sql", "123456", "SSD");
    if ($conn == false) {
        die("数据库连接失败mysql");
    } else {
        mysqli_query($conn, "set names utf8");
    }
    return $conn;
}

function mysql(string $sql)
{
    $conn = connect();
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die("数据库连接失败");
    }
    return $result;
}
