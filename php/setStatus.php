<?php
header("Access-Control-Allow-Origin: *");
/*
*/
    try{
        
        
        require_once ('db.php');	
        $status = $_POST["status"];
		$id = $_POST["gameId"];
		
		$res = $db->exec("UPDATE games SET Status = $status, Question = 0 WHERE Id = $id");
		
		if(  $res !== FALSE ) {
            echo 1;   
        } else {
            echo -1;
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>