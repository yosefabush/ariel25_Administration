<?php
/*
This file gets the title from the manage system and insert a new row to the games table
The program return to the manage system the id of the new game
*/
    try{
        require_once ('db.php');	

            $gameTitle = $_GET['title'];

            $insert  = $db->exec("INSERT INTO games (Title) 
                VALUES('$gameTitle')");
            if ($insert !== FALSE) {
                //$res = $db->query("SELECT Id FROM games WHERE Title = '$gameTitle'")->fetchAll(PDO::FETCH_ASSOC);
                $id = $db->lastInsertId();
                echo ($id);
            } else {
                echo -1;
            }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>