<?php
error_reporting(E_ERROR | E_PARSE);

// output headers so that the file is downloaded rather than displayed
header('Content-Encoding: UTF-8');
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=users.csv');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// make the file encode in utf-8
fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

// output the column headings
fputcsv($output, array('שם', 'ת"ז', 'כינוי', 'מקום עבודה', 'תפקיד', 'הגיע/נרשם'));

try{
    require_once ('db.php');

    //create the query to be inserted into the csv file
    $query = ('SELECT CONCAT(LastName, " ",  FirstName) as FullName, UserId, NickName, WorkPlace, Position, IF(Arrived=1, "כן", "") AS YesNo FROM users');
    
    // get the data
    $result = $db->prepare($query);
    $result->execute();

    // loop over the rows, outputting them
     while ($row = $result->fetch(PDO::FETCH_ASSOC)){
         fputcsv($output, $row);
     } 
    
    fclose($output);
}
catch (PDOException $e) {
    fclose($output);
    echo $e->getMessage();
} 
?>