
<?php

    include "Session.php";
    include "connessione.php";

    $nome=$_REQUEST["nome"];
    $descrizione=$_REQUEST["descrizione"];

    $query2="INSERT INTO filtri_materiali_percorsi (nome,descrizione) VALUES ('$nome','$descrizione')";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>