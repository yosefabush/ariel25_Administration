<?php
header("Access-Control-Allow-Origin: *");
/*
This file gets the title from the manage system and insert a new row to the games table
The program return to the manage system the id of the new game
If game with that title already exists, it returns the questions of this game
*/
    try{
        require_once ('db.php');	

            $gameTitle = $_POST['title'];

            $insert  = $db->exec("INSERT INTO games (Title) 
                VALUES('$gameTitle')");
            if ($insert !== FALSE) {
                $id = $db->lastInsertId();
                echo ($id);
            } else {
                $res = $db->query("SELECT Id FROM games WHERE Title = '$gameTitle'")->fetch();
                //echo(json_encode($res));
                $id = $res['Id'];
                //echo $id;
                $res = $db->query("SELECT * FROM questions WHERE GameId = $id")->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($res);               
            }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>