<?php
function connect()
{
    $conn = mysqli_connect("127.0.0.1", "sql", "123456", "SSD");
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
function insertIntoWherever(string $tableName,array $data){
    $sql="INSERT INTO ".$tableName." ";
    $i=0;
    $keySql="(";
    $valueSql="(";
    foreach($data as $key => $value){
        if(isset($value)&&strlen($value)!=0){//此方法的关键在这个if
            if($i==0){
                $i==1;
            }
            else{
                $keySql.=",";
                $valueSql.=",";
            }
            $keySql.=$key;
            $valueSql.="'".$value."'";
        }
    }
    $sql.="(".$keySql.") VALUES (".$valueSql.");";
    $conn=connect();
    $result=mysqli_query($conn,$sql);
    if(!$result){
        return 0;
    }
    return 1;
}