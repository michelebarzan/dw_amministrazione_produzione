<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];
    $id_lotto=$_REQUEST["id_lotto"];

    $cabine=[];

    $query2="SELECT    DISTINCT    dw_dati.dbo.general_numbering.id_gn, dw_dati.dbo.general_numbering.commessa, dw_dati.dbo.general_numbering.ponte, dw_dati.dbo.general_numbering.firezone, dw_dati.dbo.general_numbering.tipo, 
    dw_dati.dbo.general_numbering.verso, dw_dati.dbo.general_numbering.lato_nave, dw_dati.dbo.general_numbering.kit_cabina, dw_dati.dbo.general_numbering.finitura_A, dw_dati.dbo.general_numbering.finitura_B, 
    dw_dati.dbo.general_numbering.finitura_C, dw_dati.dbo.general_numbering.settimana, dw_dati.dbo.general_numbering.numero_cabina, dw_dati.dbo.general_numbering.famiglia, 
    dw_dati.dbo.general_numbering.piano_montaggio
FROM            dw_dati.dbo.general_numbering INNER JOIN
    dbo.lotti_pannelli ON dw_dati.dbo.general_numbering.numero_cabina = dbo.lotti_pannelli.numero_cabina
            WHERE (dw_dati.dbo.general_numbering.commessa = $id_commessa) AND lotti_pannelli.lotto=$id_lotto";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $cabina["id_gn"]=$row2['id_gn'];
            $cabina["commessa"]=$row2['commessa'];
            $cabina["ponte"]=$row2['ponte'];
            $cabina["firezone"]=$row2['firezone'];
            $cabina["tipo"]=$row2['tipo'];
            $cabina["verso"]=$row2['verso'];
            $cabina["lato_nave"]=$row2['lato_nave'];
            $cabina["kit_cabina"]=$row2['kit_cabina'];
            $cabina["finitura_A"]=$row2['finitura_A'];
            $cabina["finitura_B"]=$row2['finitura_B'];
            $cabina["finitura_C"]=$row2['finitura_C'];
            $cabina["settimana"]=$row2['settimana'];
            $cabina["numero_cabina"]=$row2['numero_cabina'];
            $cabina["famiglia"]=$row2['famiglia'];
            $cabina["piano_montaggio"]=$row2['piano_montaggio'];

            array_push($cabine,$cabina);
        }
    }
    else
        die("error");

    echo json_encode($cabine);

?>