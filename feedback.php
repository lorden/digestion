<?php

function mysql_real_escape_string($str){
    // remove once lib's installed
    return $str;
}
$name = mysql_real_escape_string($_POST['name']);
$email = mysql_real_escape_string($_POST['email']);
$message = mysql_real_escape_string($_POST['message']);
$ip = $_SERVER['REMOTE_ADDR'];
$browser = $_SERVER['HTTP_USER_AGENT'];

$message = <<<MESSAGE
Name: $name
Email: $email
Message: $message
--
IP: $ip
Browser: $browser
MESSAGE;
// send email
//mail('lorden@localhost', 'Digestion feedback', $message);
