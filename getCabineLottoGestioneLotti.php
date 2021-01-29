<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];
    $id_lotto=$_REQUEST["id_lotto"];

    $cabine=[];

    $query2="SELECT DISTINCT general_numbering_1.id_gn, general_numbering_1.commessa, general_numbering_1.ponte, general_numbering_1.firezone, general_numbering_1.tipo, 
                general_numbering_1.verso, general_numbering_1.lato_nave, general_numbering_1.kit_cabina, general_numbering_1.finitura_A, general_numbering_1.finitura_B, 
                general_numbering_1.finitura_C, general_numbering_1.settimana, general_numbering_1.numero_cabina, general_numbering_1.famiglia, 
                general_numbering_1.piano_montaggio
            FROM srv.dw_dati.dbo.general_numbering AS general_numbering_1 INNER JOIN
                dbo.lotti_pannelli ON general_numbering_1.numero_cabina = dbo.lotti_pannelli.numero_cabina
                        WHERE (general_numbering_1.commessa = $id_commessa) AND lotti_pannelli.lotto=$id_lotto";	
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
        die("error".$query2);

    echo json_encode($cabine);

?>