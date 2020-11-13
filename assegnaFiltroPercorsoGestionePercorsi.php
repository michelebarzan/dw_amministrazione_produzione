
<?php

    include "Session.php";
    include "connessione.php";

    $id_percorso=$_REQUEST["id_percorso"];
    $id_filtro=$_REQUEST["id_filtro"];

    $query2="UPDATE percorsi SET filtro=$id_filtro WHERE id_percorso=$id_percorso";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>