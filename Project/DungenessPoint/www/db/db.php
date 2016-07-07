<?php 
	include_once("tosql.php");
	$sqlc="SELECT * FROM mid ORDER BY id DESC";
	$db=mysql_query($sqlc,$connection) or die(json_encode(array("msg"=>mysql_error())));
	if(mysql_num_rows($db)){
		$rows=array();
		while($row=mysql_fetch_assoc($db)){
			$rows[]=$row;
		}
		die(json_encode($rows));
	}else{
		die(json_encode(array("mas"=>"No result")));
	}
?>