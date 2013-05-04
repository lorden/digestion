<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$choice = $_POST['preselected'];
$ip = $_SERVER['REMOTE_ADDR'];
$browser = $_SERVER['HTTP_USER_AGENT'];

$message = <<<MESSAGE
Name: $name
Email: $email
Message: $message
Choice: $choice
--
IP: $ip
Browser: $browser
MESSAGE;
// send email
mail('mealrequest@gmail.com', 'Feedback', $message);
