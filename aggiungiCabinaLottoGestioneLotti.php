<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];
    $id_lotto=$_REQUEST["id_lotto"];
    $numero_cabina=$_REQUEST["numero_cabina"];

    $cabine=[];

    $query2="INSERT INTO [dbo].[lotti_pannelli]
                ([pannello]
                ,[lotto]
                ,[numero_cabina])
            SELECT dbo.view_pannelli_cabine.id_pannello, $id_lotto AS lotto, dw_dati.dbo.general_numbering.numero_cabina
            FROM dbo.view_pannelli_cabine INNER JOIN
                                    dw_dati.dbo.general_numbering ON dbo.view_pannelli_cabine.kit_cabina = dw_dati.dbo.general_numbering.kit_cabina
            WHERE (dw_dati.dbo.general_numbering.commessa = $id_commessa) AND (dw_dati.dbo.general_numbering.numero_cabina = $numero_cabina)";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>