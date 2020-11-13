
<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    $pannelli=json_decode($_REQUEST["JSONpannelli"]);

    $pannelli_in="'".implode("','",$pannelli)."'";

    $infoPannelli=[];

    $query2="SELECT [CODPAS] as codice_pannello
                ,[pannello]
                ,[TIPO] as tipo
                ,[LUNG1] as lunghezza_1
                ,[LUNG2] as lunghezza_2
                ,[ANG] as angolo
                ,[configurazione]
                ,[forato]
                ,[elettrificato]
                ,[Rinforzato] as rinforzato
                ,[piegato]
            FROM [dw_produzione].[dbo].[filtro_pannelli] WHERE CODPAS IN ($pannelli_in) ORDER BY CODPAS";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $pannello["codice_pannello"]=$row2['codice_pannello'];
            $pannello["pannello"]=$row2['pannello'];
            $pannello["tipo"]=$row2['tipo'];
            $pannello["lunghezza_1"]=$row2['lunghezza_1'];
            $pannello["lunghezza_2"]=$row2['lunghezza_2'];
            $pannello["angolo"]=$row2['angolo'];
            $pannello["configurazione"]=$row2['configurazione'];
            $pannello["forato"]=$row2['forato']=== 'true'? true: false;;
            $pannello["elettrificato"]=$row2['elettrificato']=== 'true'? true: false;;
            $pannello["rinforzato"]=$row2['rinforzato']=== 'true'? true: false;;
            $pannello["piegato"]=$row2['piegato']=== 'true'? true: false;;

            array_push($infoPannelli,$pannello);
        }
    }
    else
        die("error".$query2);

    echo json_encode($infoPannelli);

?>