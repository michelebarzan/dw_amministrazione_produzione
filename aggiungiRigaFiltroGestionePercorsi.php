
<?php

    include "Session.php";
    include "connessione.php";

    $id_filtro=$_REQUEST["id_filtro"];

    $query2="INSERT INTO [dbo].[righe_filtri_materiali_percorsi] ([filtro]) VALUES ($id_filtro)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>