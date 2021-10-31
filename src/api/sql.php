<?php
//这个是用来给提示的，等sqlsrv函数undefine的问题解决之后就没用了
function connect()
{
    $serverName = "localhost";
    $connectionInfo = array(
        "Database" => "SCT",
        "Uid" => "sa", "PWD" => "123456",
        "CharacterSet" => "UTF-8"
    );
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    if ($conn == false) {
        die(print_r("数据库链接失败!!", true));
        return false;
    }
    return $conn;
}
function SqlSelect(string $tsql)
{
    $conn = connect();
    $get = sqlsrv_query($conn, $tsql);
    return $get;
}
