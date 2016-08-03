<?php 
	$name = $_POST["name"];
	$message = $_POST["message"];
	$sentMessage = "This is ".$name."\r\n".$message;
	mail("yangjianyiop@gmail.com", "From Portfolio Message", $sentMessage);
 ?>