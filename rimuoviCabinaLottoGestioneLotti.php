<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];
    $id_lotto=$_REQUEST["id_lotto"];
    $numero_cabina=$_REQUEST["numero_cabina"];

    $cabine=[];

    $query2="DELETE FROM [dbo].[lotti_pannelli] WHERE numero_cabina = $numero_cabina AND lotto=$id_lotto";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>