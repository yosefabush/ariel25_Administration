<?php
header("Access-Control-Allow-Origin: *");
/*

*/
    try{
        require_once ('db.php');	
            $bodyQuestion = $_POST['bodyQuestion'];
            $gameId = $_POST['gameId'];
            $imagePath = $_POST['imagePath'];
            $videoUrl = $_POST['videoUrl'];
            $answer1 = $_POST['answer1'];
            $answer2 = $_POST['answer2'];
            $answer3 = $_POST['answer3'];
            $answer4 = $_POST['answer4'];
            $correctAnswer = $_POST['correctAnswer'];
            
            $insert  = $db->exec("INSERT INTO questions (Number,GameId,Text,ImagePath,VideoUrl,Answer1,Answer2,Answer3,Answer4,CorrectAnswer) 
                VALUES (1,$gameId,'$bodyQuestion','$imagePath','$videoUrl','$answer1','$answer2','$answer3','$answer4',$correctAnswer)");
            if( $insert !== FALSE ) {
                echo 1;
            } else {
                echo -1;
            }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>