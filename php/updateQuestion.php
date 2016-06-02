<?php
header("Access-Control-Allow-Origin: *");
/*
This file UPDATE a single question in the db
*/
    try{
        
        require_once ('db.php');	
        
        
        $questionId = $_POST['questionId'];
        $bodyQuestion = $_POST['bodyQuestion'];
        $gameId = $_POST['gameId'];
        $imagePath = $_POST['imagePath'];
        $videoUrl = $_POST['videoUrl'];
        $answer1 = $_POST['answer1'];
        $answer2 = $_POST['answer2'];
        $answer3 = $_POST['answer3'];
        $answer4 = $_POST['answer4'];
        $correctAnswer = $_POST['correctAnswer'];

        $res = $db->exec("UPDATE questions SET text = '$bodyQuestion', imagePath = '$imagePath', videoUrl = '$videoUrl', answer1 = '$answer1', answer2 = '$answer2', answer3 = '$answer3', answer4 = '$answer4', correctAnswer = '$correctAnswer'  WHERE Id = $questionId ");
        if(  $res !== FALSE ) {
            echo 1;   
        } else {
            echo -1;
        }
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>