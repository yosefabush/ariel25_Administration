<?php
	echo var_dump($_FILES);
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
	$path = "../images/";
        move_uploaded_file($_FILES['file']['tmp_name'], $path.$_FILES['file']['name']);
    }

?>