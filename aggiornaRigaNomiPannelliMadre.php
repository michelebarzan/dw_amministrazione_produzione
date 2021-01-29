<?php

    include "Session.php";
    include "connessione.php";

    $id_nome_pannello_madre=$_REQUEST["id_nome_pannello_madre"];
    $colonna=$_REQUEST["colonna"];
    $valore=$_REQUEST["valore"];

    $q="UPDATE nomi_pannelli_madre SET [$colonna]='$valore' WHERE id_nome_pannello_madre = $id_nome_pannello_madre";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>