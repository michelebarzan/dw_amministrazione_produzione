
<?php

    include "Session.php";
    include "connessione.php";

    $id_riga_filtro=$_REQUEST["id_riga_filtro"];
    $data=json_decode($_REQUEST["JSONdata"]);

    $data_string="";
    foreach($data as $JSONcolumn)
    {
        $column=json_decode(json_encode($JSONcolumn,True),True);
        
        $data_string.="".$column['name']." = '".$column['value']."',";
    }
    $data_string=rtrim($data_string, ",");

    $query2="UPDATE righe_filtri_materiali_percorsi SET $data_string WHERE id_riga_filtro=$id_riga_filtro";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>