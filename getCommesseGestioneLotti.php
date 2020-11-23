<?php

    include "connessione.php";

    $commesse=[];

    $query2="SELECT * FROM commesse";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $commessa["id_commessa"]=$row2['id_commessa'];
            $commessa["commessa"]=$row2['commessa'];
            $commessa["descrizione"]=$row2['descrizione'];
            $commessa["cantiere"]=$row2['cantiere'];

            array_push($commesse,$commessa);
        }
    }
    else
        die("error");

    echo json_encode($commesse);

?>