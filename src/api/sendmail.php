<?php

function sendmail($to, $subject, $body)
{
    $smtp_host = "smtp.qq.com"; //smtp服务器
    $user = "691518421@qq.com"; //发信邮箱
    $pass = "fvkgdigsoyovbcgd"; //邮箱密码、授权码
    $charset = "utf-8"; //根据自己的网页编码选择

    $header = "MIME-Version:1.0\r\n";
    $header .= "Content-Type:text/html; charset=" . $charset . "\r\n";
    $header .= "To: " . $to . "\r\n";
    $header .= "From:登录验证码\r\n";
    $header .= "Subject: " . "=?" . strtoupper($charset) . "?B?" . base64_encode($subject) . "?=" . "\r\n";
    $header .= "Date: " . date("r") . "\r\n";
    $header .= "X-Mailer: By PHP(" . phpversion() . ")\r\n";
    list($msec, $sec) = explode(" ", microtime());
    $header .= "Message-ID: " . date("YmdHis", $sec) . "." . $msec . "\r\n";

    $sent = 0;
    $to_arr = explode(";", $to);
    foreach ($to_arr as $rcpt_to) {
        $sock = @fsockopen($smtp_host, 25, $errno, $errstr, 10);

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
    echo htmlspecialchars($cmd);
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
    echo ("<br>" . $response . "<br><br>");
    return TRUE;
}
