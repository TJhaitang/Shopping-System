<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录</title>
</head>

<body>
    <form action='login.php' method='post'>
        用户名：<input type='text' name='username' />
        <br />
        密码：<input type='test' name='password' />
        <br />
        <input type='submit' name='submit' value='login' />

    </form>
    <?php
    include "sql.php";
    $conn = connect();
    $tsql = "SELECT sname 
            FROM student";
    $getName = sqlsrv_query($conn, $tsql);
    if ($getName == false) {
        echo "<script>window.alert(\"die2!\")</script>";
    }
    if (sqlsrv_fetch($getName) === false) {
        echo "Error in retrieving row.\n";
        die(print_r(sqlsrv_errors(), true));
    }
    $test = sqlsrv_get_field($getName, 0);
    if ($test == false) {
        die(print_r(sqlsrv_errors(), true));
        echo "<script>window.alert(\"die3!\")</script>";
    }
    echo $test;
    ?>
</body>

</html>