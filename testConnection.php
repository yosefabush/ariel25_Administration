<?php
	try{
		$db = new PDO('mysql:host=209.188.15.35;dbname=effeecom_Ariel25_DB', 'effeecom', 'eff23130');
		
		
		$resultSet = $db->query('SELECT * FROM admins');
		
		while( $row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
			var_dump($row);
			echo '<br>';
		}
		
		$res = $db->query('SELECT * FROM admins')->fetchAll(PDO::FETCH_ASSOC);
		var_dump(json_encode($res));
		
	} catch (PDOException $e) {
		echo $e->getMessage();
	}
	
	
?>