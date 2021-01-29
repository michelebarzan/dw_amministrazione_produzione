<?php

    include "Session.php";
    include "connessione.php";

    $id_nome_pannello_madre=$_REQUEST["id_nome_pannello_madre"];

    $q="DELETE FROM nomi_pannelli_madre WHERE id_nome_pannello_madre = $id_nome_pannello_madre";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>