<?php

	include("tosql.php");//Using my_sql store data. This is a access file link to my database.
	if($_POST['startday'] == $_POST['endday']){
			$onedayArray = [];
			$onedayDB = mysql_query("SELECT * FROM days WHERE day=".$_POST['startday']." ORDER BY id");
			while($onedayRow = mysql_fetch_assoc($onedayDB)){
				if($onedayRow['kind']=="paper\/reading"){
					$onedayRow['kind'] = "paper";
				}
				array_push($onedayArray,$onedayRow);
			}
		$returnData = (object) array( 'day' => $_POST['startday'], 'data' => $onedayArray);
		echo json_encode($returnData);
	}
	
?>