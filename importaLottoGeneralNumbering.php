<?php

    include "connessione.php";
    include "Session.php";

    $id_lottoOld=$_REQUEST["id_lottoOld"];
    $profilo=$_REQUEST["profilo"];

    switch ($profilo)
    {
        case 'mb':$suffisso="_mb";break;
        case 'mf':$suffisso="";break;
        case 'bf':$suffisso="_bf";break;
    }

    $query2="INSERT INTO [dbo].[lotti]
            ([lotto]
            ,[descrizione]
            ,[note]
            ,[commessa]
            ,[dataCreazione]
            ,[utente]
            ,[wbs]
            ,[id_materiale]) SELECT lotto, Descrizione, note, commessa, data, ".$_SESSION['id_utente']." AS utente, WBS, [ID Materiale]
            FROM  (SELECT        id_lotto, commessa, totPannelli, ultimaVersione, data, note, nVersioni, lotto, generabile, Descrizione, WBS, [ID Materiale], avvisoRevisioneCodcab
            FROM            SRV.dw_dati.dbo.lotti_mb AS lotti_mb_1
            UNION ALL
            SELECT        id_lotto, commessa, totPannelli, ultimaVersione, data, note, nVersioni, lotto, generabile, Descrizione, WBS, [ID Materiale], avvisoRevisioneCodcab
            FROM            SRV.dw_dati.dbo.lotti AS lotti_2
            UNION ALL
            SELECT        id_lotto, commessa, totPannelli, ultimaVersione, data, note, nVersioni, lotto, generabile, Descrizione, WBS, [ID Materiale], avvisoRevisioneCodcab
            FROM            SRV.dw_dati.dbo.lotti_bf AS lotti_bf_1) AS lotti_1
            WHERE (id_lotto = $id_lottoOld)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $query3="SELECT * FROM lotti WHERE id_lotto=(SELECT MAX(id_lotto) FROM lotti WHERE utente=".$_SESSION['id_utente'].")";
        $result3=sqlsrv_query($conn,$query3);
        if($result3==TRUE)
        {
            while($row3=sqlsrv_fetch_array($result3))
            {
                $id_lotto=$row3['id_lotto'];
                $id_commessa=$row3['commessa'];
                $lotto=$row3['lotto'];

                $query4="INSERT INTO [dbo].[lotti_pannelli]
                            ([pannello]
                            ,[lotto]
                            ,[numero_cabina]) SELECT db_tecnico.dbo.pannelli_cabine.id_pannello, $id_lotto AS Expr1, general_numbering_1.numero_cabina
                        FROM SRV.dw_dati.dbo.general_numbering AS general_numbering_1 INNER JOIN
                                                db_tecnico.dbo.cabine ON general_numbering_1.kit_cabina = db_tecnico.dbo.cabine.codice_cabina INNER JOIN
                                                db_tecnico.dbo.pannelli_cabine ON db_tecnico.dbo.cabine.id_cabina = db_tecnico.dbo.pannelli_cabine.id_cabina INNER JOIN
                                                SRV.dw_dati.dbo.lotti$suffisso AS lotti_1 ON general_numbering_1.lotto$suffisso = lotti_1.lotto
                        WHERE (lotti_1.id_lotto = $id_lottoOld)";
                $result4=sqlsrv_query($conn,$query4);
                if($result4==TRUE)
                {
                    $response["id_commessa"]=$id_commessa;
                    $response["id_lotto"]=$id_lotto;
                    $response["lotto"]=$lotto;
                    echo json_encode($response);
                }
                else
                    die("error1");
            }
        }
        else
            die("error2");
    }
    else
        die("error3".$query2);

?>