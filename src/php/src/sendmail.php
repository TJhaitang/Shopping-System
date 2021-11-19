<?php
function sendmail($to, $subject, $body)//此方法在ubuntu服务器上出现了问题，目前猜测是阿里云关闭了必要端口
{
    $smtp_host = "smtp.qq.com"; //smtp服务器
    $user = "691518421@qq.com"; //发信邮箱
    $pass = "fvkgdigsoyovbcgd"; //邮箱密码、授权码
    $charset = "utf-8"; //根据自己的网页编码选择

    $header = "MIME-Version:1.0\r\n";
    $header .= "Content-Type:text/html; charset=" . $charset . "\r\n";
    $header .= "To: " . $to . "\r\n";
    $header .= "From: 商城验证码\r\n";
    $header .= "Subject: " . "=?" . strtoupper($charset) . "?B?" . base64_encode($subject) . "?=" . "\r\n";
    $header .= "Date: " . date("r") . "\r\n";
    $header .= "X-Mailer: By PHP(" . phpversion() . ")\r\n";
    list($msec, $sec) = explode(" ", microtime());
    $header .= "Message-ID: " . date("YmdHis", $sec) . "." . $msec . "\r\n";

    $sent = 0;
    $to_arr = explode(";", $to);
    foreach ($to_arr as $rcpt_to) {
        $sock = @fsockopen($smtp_host,587, $errno, $errstr, 10);

        if ($sock && smtp_ok($sock)) {
            if (smtp_cmd($sock, "HELO localhost")) {
                if (smtp_cmd($sock, "AUTH LOGIN " . base64_encode($user))) {
                    if (smtp_cmd($sock, base64_encode($pass))) {
                        if (smtp_cmd($sock, "MAIL FROM:<" . $user . ">")) {
                            if (smtp_cmd($sock, "RCPT TO:<" . $to . ">")) {
                                if (smtp_cmd($sock, "DATA")) {
                                    if (smtp_data($sock, $header, $body)) {
                                        if (smtp_cmd($sock, "QUIT")) {
                                            $sent++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            fclose($sock);
        }
    }
    return $sent;
}
function smtp_cmd($sock, $cmd)
{
    fputs($sock, $cmd . "\r\n");
    // echo htmlspecialchars($cmd);
    return smtp_ok($sock);
}
function smtp_data($sock, $header, $body)
{
    fputs($sock, $header . "\r\n");
    fputs($sock, $body . "\r\n.\r\n");
    return smtp_ok($sock);
}
function smtp_ok($sock)
{
    $response = fgets($sock, 512);
    if (!preg_match("/^[23]/", $response)) {
        fputs($sock, "QUIT\r\n");
        fgets($sock, 512);
        return FALSE;
    }
    // echo ("<br>" . $response . "<br><br>");
    return TRUE;
}

// function send($to,$subject,$body){#(https://github.com/PHPMailer/PHPMailer/)
    
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require './src/Exception.php';
// require './src/PHPMailer.php';
// require './src/SMTP.php';

// $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
// try {
//     //服务器配置
//     $mail->CharSet ="UTF-8";                     //设定邮件编码
//     $mail->SMTPDebug = 0;                        // 调试模式输出
//     $mail->isSMTP();                             // 使用SMTP
//     $mail->Host = 'smtp.qq.com';                // SMTP服务器
//     $mail->SMTPAuth = true;                      // 允许 SMTP 认证
//     $mail->Username = '691518421@qq.com';                // SMTP 用户名  即邮箱的用户名
//     $mail->Password = 'gomiittvotphbfid';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
//     $mail->SMTPSecure = 'ssl';                    // 允许 TLS 或者ssl协议
//     $mail->Port = 587;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

//     $mail->setFrom('691518421@qq.com', 'Mailer');  //发件人
//     $mail->addAddress($to, 'Joe');  // 收件人
//     //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
//     $mail->addReplyTo('691518421@qq.com', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
//     //$mail->addCC('cc@example.com');                    //抄送
//     //$mail->addBCC('bcc@example.com');                    //密送

//     //发送附件
//     // $mail->addAttachment('../xy.zip');         // 添加附件
//     // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

//     //Content
//     $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
//     $mail->Subject = $subject . time();
//     $mail->Body    = '<h2>'.$body.'</h2>' . date('Y-m-d H:i:s');
//     $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

//     $mail->send();
//     return 1;
// } catch (Exception $e) {
//     return 0;
// }
// }


?>