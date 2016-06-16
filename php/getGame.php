<?php
header("Access-Control-Allow-Origin: *");
/*
This file gets game title from the manage system and returns the questions of that game
*/
    try{
        
        
        require_once ('db.php');	
        if (isset($_GET['req']) && $_GET['req'] == "getQuestions" && isset($_GET['gameId'])) {
			$id = $_GET['gameId'];
		} else {
			$title = $_GET['title'];
			$res = $db->query("SELECT Id FROM games WHERE Title = '$title'")->fetch();
                //echo(json_encode($res));
                $id = $res['Id'];
		}
		
        
                //echo $id;
                $res = $db->query("SELECT * FROM questions WHERE GameId = $id")->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($res);   
     //   echo json_encode($res);  
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>