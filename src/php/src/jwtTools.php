<?php
$path = dirname(__FILE__);    
chdir($path);   
require "../vendor/why.php";
require "../vendor/autoload.php";

use \Firebase\JWT\JWT;

define('KEY','l2g3j23hg4kj21g31g32jkhg1k2');//随便输的，这里有啥规则么？

function jwtDecode($jwt){
    JWT::$leeway = 60;
    return JWT::decode($jwt, KEY, ['HS256']);
}

function getToken(string $type,string $email,string $uid){
    $nowtime=time();
    $token=array(
        'iss'=>'Shopping-System',
        'aud'=>'MembersAndMerchants',
        'iat'=>$nowtime,
        'nbf'=>$nowtime+2,//此token2秒后合法//这么做的逻辑是啥呢??//看了看源代码，这完全赘余
        'exp'=>$nowtime+3600,//此token在十小时后失效
        'data'=>array(
            'uid'=>$uid,
            'email'=>$email,
            'type'=>$type
        )
    );
    $JsonWebToken=JWT::encode($token,KEY);
    return $JsonWebToken;
}

function getUidFromToken(string $token){
    JWT::$leeway = 60;
    $decoded = JWT::decode($token, KEY, ['HS256']);
    $arr=(array)$decoded;
    $data=(array)$arr['data'];
    return $data['uid'];
}

//这里判断合法需要判断这个页面是商家部分还是会员部分
//但说实话我觉得这样不太好，虽然功能上没什么问题但用起来逻辑性较差
function IsTokenValid(string $token,string $type){
    JWT::$leeway = 60;//当前时间减去60，把时间留点余地//这样做的具体实现方式是啥？
    $decoded = JWT::decode($token, KEY, ['HS256']);
    $arr=(array)$decoded;
    if($arr['exp']&&$arr['exp']>time()){
        $data=(array)$arr['data'];
        if($data['type']&&$data['type']==$type){
            return true;
        }
    }
    return false;
}

function getUidFromHttp($type){
    $token=isset($_SERVER['HTTP_X_TOKEN'])?$_SERVER['HTTP_X_TOKEN']:"";
    if(empty($token)){
        echo json_encode($_SERVER);
        // echo json_encode(array("status"=>"TokenNotExist"));
        exit;
    }   
    else{
        if(IsTokenValid($token,$type)==true){
            $uid=getUidFromToken($token);
            return $uid;
        }
        else{
            echo json_encode(array("status"=>"TokenNotValid"));
            exit;
        }
    }
    return 0;
}