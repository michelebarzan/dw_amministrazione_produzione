<?php

    include "Session.php";
    include "connessione.php";

    $id_spessore_madre=$_REQUEST["id_spessore_madre"];

    $q="DELETE FROM spessori_madre WHERE id_spessore_madre = $id_spessore_madre";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>