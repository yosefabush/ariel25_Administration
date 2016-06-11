<?php
header("Access-Control-Allow-Origin: *");
/*
This file returns to the manage system json list with the title of all the existing games
*/
    try{
        require_once ('db.php');	
        
        /* Asaf: you need the id.... */
        $res = $db->query("SELECT Id, Title FROM games")->fetchAll(PDO::FETCH_ASSOC);
       
        echo json_encode($res);  
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>