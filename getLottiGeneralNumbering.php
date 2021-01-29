<?php

    include "connessione.php";

    $lotti=[];

    $query2="SELECT        TOP (100) PERCENT lotti.id_lotto, lotti.lotto, lotti.profilo, dbo.commesse.id_commessa, dbo.commesse.commessa
    FROM            (SELECT        id_lotto, lotto, commessa, 'mf' AS profilo
                              FROM            SRV.dw_dati.dbo.lotti AS lotti_1
                              UNION
                              SELECT        id_lotto, lotto, commessa, 'bf' AS profilo
                              FROM            SRV.dw_dati.dbo.lotti_bf AS lotti_2
                              UNION
                              SELECT        id_lotto, lotto, commessa, 'mb' AS profilo
                              FROM            SRV.dw_dati.dbo.lotti_mb AS lotti_3) AS lotti INNER JOIN
                             dbo.commesse ON lotti.commessa = dbo.commesse.id_commessa
    ORDER BY LEN(lotti.lotto), lotti.lotto";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $lotto["id_lotto"]=$row2['id_lotto'];
            $lotto["lotto"]=$row2['lotto'];
            $lotto["profilo"]=$row2['profilo'];
            $lotto["id_commessa"]=$row2['id_commessa'];
            $lotto["commessa"]=$row2['commessa'];

            array_push($lotti,$lotto);
        }
    }
    else
        die("error");

    echo json_encode($lotti);

?>