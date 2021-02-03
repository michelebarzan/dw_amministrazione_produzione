<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];
    $id_lotto=$_REQUEST["id_lotto"];

    $cabine=[];

    $query2="SELECT * FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa AND numero_cabina NOT IN (SELECT numero_cabina FROM lotti_pannelli WHERE lotto=$id_lotto) AND kit_cabina IS NOT NULL";	
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
            $cabina["lotto"]=$row2['lotto'];
            $cabina["famiglia"]=$row2['famiglia'];
            $cabina["piano_montaggio"]=$row2['piano_montaggio'];
            $cabina["visibile_programmmazione"]=$row2['visibile_programmmazione'];

            array_push($cabine,$cabina);
        }
    }
    else
        die("error");

    echo json_encode($cabine);

?>