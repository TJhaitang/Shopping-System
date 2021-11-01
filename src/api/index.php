<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试页面</title>
</head>

<body>
    <!--这个是用来测试php代码用的！！！！！！！-->
    <?php
    include "./mysql.php";
    $conn = connect();
    if ($conn) {
        echo "<p>mysql连接成功!</p>";
    } else {
        echo "55555";
    }
    ?>
    <h1>请千万不要用这个！</h1>
    <textarea rows="30" cols="100" id="tst"></textarea>
    <form name="cs">
        <input type="text" name="sql" />
        <button type="button" onclick="upload()">提交</button>
    </form>
</body>
<script>
    function upload() {
        var xhttp = new XMLHttpRequest();
        let sql = cs.sql.value;
        var t = document.getElementById("tst");
        t.innerHTML = t.innerHTML + sql + "\n";
        cs.sql.value = "";
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var t = document.getElementById("tst");
                console.log(this.responseText);
            }
        };
        xhttp.open("POST", "./login/getMail.php", true);
        xhttp.send({
            username: sql
        });
    }
</script>

</html>