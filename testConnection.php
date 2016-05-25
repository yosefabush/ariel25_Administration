<?php
	try{
		$db = new PDO('mysql:host=localhost;dbname=ariel25_db', 'root', 'a17d2A17');
		
		
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