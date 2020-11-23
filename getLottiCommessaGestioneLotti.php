<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];

    $lotti=[];

    $query2="SELECT [id_lotto]
                ,[lotto]
                ,[descrizione]
                ,[note]
                ,[commessa]
                ,[dataCreazione]
                ,[utente]
                ,[wbs]
                ,[id_materiale]
            FROM [dw_produzione].[dbo].[lotti] WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $lotto["id_lotto"]=$row2['id_lotto'];
            $lotto["lotto"]=$row2['lotto'];
            $lotto["descrizione"]=$row2['descrizione'];
            $lotto["note"]=$row2['note'];
            $lotto["commessa"]=$row2['commessa'];
            $lotto["dataCreazione"]=$row2['dataCreazione'];
            $lotto["utente"]=$row2['utente'];
            $lotto["wbs"]=$row2['wbs'];
            $lotto["id_materiale"]=$row2['id_materiale'];

            array_push($lotti,$lotto);
        }
    }
    else
        die("error");

    echo json_encode($lotti);

?>