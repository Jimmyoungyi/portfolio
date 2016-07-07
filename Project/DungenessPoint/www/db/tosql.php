<?php  
$db_host='localhost';
$db_database='jimmyoun_617';
$db_username='jimmyoun';
$db_password='Jiangui123!';
$connection=mysql_connect($db_host,$db_username,$db_password)or die(mysql_error());
mysql_select_db($db_database,$connection)or die(mysql_error());
?>

