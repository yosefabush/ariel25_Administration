<?php
    
    try{
		$db = new PDO('mysql:host=209.188.15.35;dbname=effeecom_Ariel25_DB', 'effeecom', 'eff23130');
		
        if (isset($_GET['req']) && $_GET['req'] == 'insertGame') {
            if(isset($_GET['title'])) {
                $gameTitle = $_GET['title'];
            }
                
            $result  = $db->exec('INSERT INTO games (`Id`, `Title`, `Status`, `Question`) 
                VALUES(NULL, $gameTitle, '0', '')';
            if ($result !== FALSE) {
               var_dump(json_encode($result)); 
            }
        }
                                 
	} catch (PDOException $e) {
		echo $e->getMessage();
	}


?>