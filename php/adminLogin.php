<?php
header("Access-Control-Allow-Origin: *");
/*
This file validates if the given user and password are in the db admins table
*/
    try{
        
        require_once ('db.php');	
        
        
        $user = $_POST['username'];
        $pass = $_POST['password'];
        
        $res = $db->query("SELECT * FROM admins WHERE Id = $user AND Password= $pass")->fetch();
        if( $res['Password'] > 0 ) {
            echo 1;   
        } else {
            echo -1;
        }
        
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>