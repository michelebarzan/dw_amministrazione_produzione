
<?php

    include "Session.php";
    include "connessione.php";

    $id_riga_filtro=$_REQUEST["id_riga_filtro"];

    $query2="INSERT INTO righe_filtri_materiali_percorsi
                ([tipo]
                ,[configurazione]
                ,[forato]
                ,[elettrificato]
                ,[rinforzato]
                ,[piegato]
                ,[lunghezza1_max]
                ,[lunghezza1_min]
                ,[lunghezza2_max]
                ,[lunghezza2_min]
                ,[angolo_max]
                ,[angolo_min],
                tipo_pannello,
                filtro)
            SELECT [tipo]
            ,[configurazione]
            ,[forato]
            ,[elettrificato]
            ,[rinforzato]
            ,[piegato]
            ,[lunghezza1_max]
            ,[lunghezza1_min]
            ,[lunghezza2_max]
            ,[lunghezza2_min]
            ,[angolo_max]
            ,[angolo_min],
            tipo_pannello,
            filtro FROM righe_filtri_materiali_percorsi WHERE id_riga_filtro=$id_riga_filtro";
    $result2=sqlsrv_query($conn,$query2);
    if($result2===FALSE)
        die("error".$query2);

?>