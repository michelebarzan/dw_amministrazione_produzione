
<?php

include "Session.php";
include "connessione.php";

    $id_percorso=$_REQUEST["id_percorso"];
    $id_stazione=$_REQUEST["id_stazione"];

    $query2="DELETE FROM [dbo].[stazioni_percorsi] WHERE stazione=$id_stazione AND percorso=$id_percorso";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>