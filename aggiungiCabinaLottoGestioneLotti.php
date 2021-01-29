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
                SELECT dbo.view_pannelli_cabine.id_pannello, $id_lotto AS lotto, general_numbering_1.numero_cabina AS Expr1
                FROM dbo.view_pannelli_cabine INNER JOIN
                    SRV.dw_dati.dbo.general_numbering AS general_numbering_1 ON dbo.view_pannelli_cabine.kit_cabina = general_numbering_1.kit_cabina
                WHERE (general_numbering_1.commessa =  $id_commessa) AND (general_numbering_1.numero_cabina = '$numero_cabina')";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>