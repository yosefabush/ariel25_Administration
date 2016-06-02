<?php
header("Access-Control-Allow-Origin: *");
/*
This file gets game title from the manage system and returns the questions of that game
*/
    try{
        
        $title = $_GET['title'];
        require_once ('db.php');	
        
        $res = $db->query("SELECT Id FROM games WHERE Title = '$title'")->fetch();
                //echo(json_encode($res));
                $id = $res['Id'];
                //echo $id;
                $res = $db->query("SELECT * FROM questions WHERE GameId = $id")->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($res);   
     //   echo json_encode($res);  
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>