
<?php

    include "Session.php";
    include "connessione.php";

    $id_percorso=$_REQUEST["id_percorso"];
    $posizioni=json_decode($_REQUEST["JSONposizioni"]);

    foreach($posizioni as $JSONposizione)
    {
        $posizione=json_decode(json_encode($JSONposizione,True),True);
        
        $query2="UPDATE [dbo].[stazioni_percorsi] SET posizione=".$posizione['posizione']." WHERE percorso=$id_percorso AND stazione=".$posizione['id_stazione'];
        $result2=sqlsrv_query($conn,$query2);
        if($result2===FALSE)
            die("error".$query2);
    }

?>