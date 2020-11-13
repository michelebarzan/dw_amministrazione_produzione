
<?php

    include "Session.php";
    include "connessione.php";

    $id_percorso=$_REQUEST["id_percorso"];
    $id_stazione=$_REQUEST["id_stazione"];

    $query2="INSERT INTO [dbo].[stazioni_percorsi]
                ([stazione]
                ,[percorso]
                ,[posizione])
            VALUES ($id_stazione,$id_percorso,NULL)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>