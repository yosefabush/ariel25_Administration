<?php
header("Access-Control-Allow-Origin: *");
/*

*/
    try{
        require_once ('db.php');	
        $questionId = $_POST['questionId'];
		
		$delete  = $db->exec("DELETE FROM questions WHERE Id=$questionId");
		 if( $delete !== FALSE ) {
                echo 1;
            } else {
                echo -1;
            }

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>