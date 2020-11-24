<?php

    include "connessione.php";

    $lotti=[];

    /*$query2="SELECT        TOP (100) PERCENT dw_dati.dbo.commesse.commessa, dw_dati.dbo.lotti.lotto, dw_dati.dbo.lotti.data, dw_dati.dbo.lotti.id_lotto
    FROM            dw_dati.dbo.lotti INNER JOIN
                             dw_dati.dbo.commesse ON dw_dati.dbo.lotti.commessa = dw_dati.dbo.commesse.id_commessa
    ORDER BY LEN(dw_dati.dbo.lotti.lotto), dw_dati.dbo.lotti.lotto";	*/
    $query2="SELECT        dbo.lotti.id_lotto, dbo.lotti.lotto, dbo.lotti.descrizione, dbo.lotti.note, dbo.commesse.id_commessa, dbo.commesse.commessa, dbo.lotti.dataCreazione
    FROM            dbo.lotti INNER JOIN
                             dbo.commesse ON dbo.lotti.commessa = dbo.commesse.id_commessa";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $lotto["id_lotto"]=$row2['id_lotto'];
            $lotto["lotto"]=$row2['lotto'];
            $lotto["commessa"]=$row2['commessa'];
            $lotto["dataCreazione"]=$row2['dataCreazione'];
            $lotto["dataCreazioneString"]=$row2['dataCreazione']->format('d/m/Y H:i:s');

            array_push($lotti,$lotto);
        }
    }
    else
        die("error");

    echo json_encode($lotti);

?>