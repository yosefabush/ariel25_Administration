<?php
header("Access-Control-Allow-Origin: *");
/*

*/
    try{
        require_once ('db.php');	
        $gameId = $_POST['gameID'];
		
        // first delete the questions associated with it (No relations... why? we could have used cascade)
        $deleteQuestions = $db->exec("DELETE FROM questions where GameId=$gameId");
        if($deleteQuestions === FALSE){
            echo -1;
        }else{
        // if all is right when deleting questions, procceed to deleting the game itself
		$deleteGame  = $db->exec("DELETE FROM games WHERE Id=$gameId");
		 if( $deleteGame !== FALSE ) {
                echo 1;
            } else {
                echo print_r($db->errorInfo(), true); //Asaf: returns error information in a stirng
            }
        }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>