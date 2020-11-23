
<?php

    include "Session.php";
    include "connessione.php";

    $lotto=$_REQUEST["lotto"];
    $descrizione=$_REQUEST["descrizione"];
    $note=$_REQUEST["note"];
    $commessa=$_REQUEST["commessa"];
    $wbs=$_REQUEST["wbs"];
    $id_materiale=$_REQUEST["id_materiale"];

    $query2="INSERT INTO lotti (lotto,descrizione,note,commessa,wbs,id_materiale,utente,dataCreazione) VALUES ('$lotto','$descrizione','$note',$commessa,'$wbs','$id_materiale',".$_SESSION['id_utente'].",GETDATE())";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>