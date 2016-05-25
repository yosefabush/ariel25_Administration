<?php

    try{
        require_once ('db.php');	

            $gameTitle = $_GET['title'];

            $insert  = $db->exec("INSERT INTO games (Title) 
                VALUES('$gameTitle')");
            if ($insert !== FALSE) {
               echo 'good';
            } else {
                echo 'bad';
            }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>