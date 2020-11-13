
<?php

    include "Session.php";
    include "connessione.php";

    $id_riga_filtro=$_REQUEST["id_riga_filtro"];

    $query2="DELETE FROM righe_filtri_materiali_percorsi WHERE id_riga_filtro=$id_riga_filtro";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>