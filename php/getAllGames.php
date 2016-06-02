<?php
header("Access-Control-Allow-Origin: *");
/*
This file returns to the manage system json list with the title of all the existing games
*/
    try{
        require_once ('db.php');	
        
        $res = $db->query("SELECT * FROM games")->fetchAll(PDO::FETCH_ASSOC);
       
        echo json_encode($res);  
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>