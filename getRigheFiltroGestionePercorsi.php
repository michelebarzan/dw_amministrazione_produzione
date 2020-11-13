
<?php

    include "Session.php";
    include "connessione.php";

    $id_filtro=$_REQUEST["id_filtro"];

    $righe_filtri=[];

    $query2="SELECT * FROM righe_filtri_materiali_percorsi WHERE filtro=$id_filtro ORDER BY id_riga_filtro DESC";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $riga["id_riga_filtro"]=$row2['id_riga_filtro'];
            $riga["tipo"]=$row2['tipo'];
            $riga["configurazione"]=$row2['configurazione'];
            /*$riga["forato"]=$row2['forato']=== 'true'? true: false;
            $riga["elettrificato"]=$row2['elettrificato']=== 'true'? true: false;
            $riga["rinforzato"]=$row2['rinforzato']=== 'true'? true: false;
            $riga["piegato"]=$row2['piegato']=== 'true'? true: false;*/
            $riga["forato"]=$row2['forato'];
            $riga["elettrificato"]=$row2['elettrificato'];
            $riga["rinforzato"]=$row2['rinforzato'];
            $riga["piegato"]=$row2['piegato'];
            $riga["lunghezza1_max"]=$row2['lunghezza1_max'];
            $riga["lunghezza1_min"]=$row2['lunghezza1_min'];
            $riga["lunghezza2_max"]=$row2['lunghezza2_max'];
            $riga["lunghezza2_min"]=$row2['lunghezza2_min'];
            $riga["angolo_max"]=$row2['angolo_max'];
            $riga["angolo_min"]=$row2['angolo_min'];
            $riga["filtro"]=$row2['filtro'];
            $riga["tipo_pannello"]=$row2['tipo_pannello'];

            array_push($righe_filtri,$riga);
        }
    }
    else
        die("error".$query2);

    echo json_encode($righe_filtri);

?>