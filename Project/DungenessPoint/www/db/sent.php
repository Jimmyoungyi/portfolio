<?php 
include("tosql.php");
function prepSQL($str) {
	if(get_magic_quotes_gpc()) {
		$str = stripslashes($str);
	}
	return mysql_escape_string($str);
}
echo $_FILES['img']."<br>";
echo $_FILES['img']['size']."<br>";

if (isset($_FILES['img']) && $_FILES['img']['size'] > 0) {
	$tmpName = $_POST['img']['tmp_name'];
	$fp = fopen($tmpName, 'r');
	$data = fread($fp, filesize($tmpName));
	$data = addslashes($data);
	fclose($fp);
	echo $data."<br>";
}
$sql_qry = "INSERT INTO `mid`(
	id, 
	title, 
	lat, 
	lng, 
	many, 
	advise, 
	notes,
	img)
VALUES (
	NULL, 
	'".prepSQL($_POST['title'])."', 
	'".prepSQL($_POST['lat'])."', 
	'".prepSQL($_POST['lng'])."', 
	'".prepSQL($_POST['many'])."', 
	'".prepSQL($_POST['advise'])."', 
	'".prepSQL($_POST['notes'])."',
	'".prepSQL($_POST['img'])."')";
mysql_query($sql_qry)or die(mysql_error());
$db =mysql_query( "SELECT id FROM `mid` ORDER BY id DESC LIMIT 1");
$row=mysql_fetch_array($db);
echo $sql_qry."<br>";
echo json_encode($_POST)."<br>";
echo json_encode($_FILES);
?>
<script>
	var id; 
	if(localStorage.localid){
		id=localStorage.localid.split(',');
	}else{
		id=[];
		localStorage.localid=[];
	}
	id.push(<?php echo $row[0]; ?>)
	localStorage.localid=id;
	document.location="../index.html#history";
</script>
