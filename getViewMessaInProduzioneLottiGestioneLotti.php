
<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    $id_lotto=$_REQUEST["id_lotto"];

    $data=[];

    $query1="SELECT * FROM view_messa_in_produzione_lotti WHERE id_lotto=$id_lotto";
    $result1=sqlsrv_query($conn,$query1);
    if($result1==TRUE)
    {
        while($row1=sqlsrv_fetch_array($result1))
        {
            $row["id_percorso"]=$row1['id_percorso'];
            $row["id_filtro"]=$row1['id_filtro'];
            $row["nome_filtro"]=$row1['nome_filtro'];
            $row["descrizione_filtro"]=$row1['descrizione_filtro'];
            $row["commessa"]=$row1['commessa'];
            $row["lotto"]=$row1['lotto'];
            $row["data"]=$row1['data'];
            $row["dataString"]=$row1['data']->format('d/m/Y H:i:s');
            $row["numero_cabina"]=$row1['numero_cabina'];
            $row["id_lotto"]=$row1['id_lotto'];
            $row["id_lotto_pannello"]=$row1['id_lotto_pannello'];
            $row["numero_pannello"]=$row1['numero_pannello'];
            $row["nome_percorso"]=$row1['nome_percorso'];
            $row["descrizione_percorso"]=$row1['descrizione_percorso'];
            $row["attivo"]=$row1['attivo'];
            $row["priorita"]=$row1['priorita'];

            array_push($data,$row);
        }
    }
    else
        die("error".$query2);

    $query2="SELECT NULL AS id_percorso, NULL AS id_filtro, NULL AS nome_filtro, NULL AS descrizione_filtro, dbo.view_lotti_pannelli.commessa, dbo.view_lotti_pannelli.lotto, dbo.view_lotti_pannelli.data, dbo.view_lotti_pannelli.numero_cabina, 
                dbo.view_lotti_pannelli.id_lotto, dbo.view_lotti_pannelli.id_lotto_pannello, dbo.view_lotti_pannelli.numero_pannello, NULL AS nome_percorso, NULL AS descrizione_percorso, NULL AS attivo, NULL AS priorita
            FROM dbo.filtro_pannelli INNER JOIN
                dbo.view_lotti_pannelli ON dbo.filtro_pannelli.CODPAS = dbo.view_lotti_pannelli.numero_pannello
            WHERE (dbo.filtro_pannelli.CODPAS NOT IN
                    (SELECT numero_pannello
                    FROM dbo.view_messa_in_produzione_lotti
                    WHERE (id_lotto = $id_lotto))) AND (dbo.view_lotti_pannelli.id_lotto = $id_lotto)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $row["id_percorso"]=$row2['id_percorso'];
            $row["id_filtro"]=$row2['id_filtro'];
            $row["nome_filtro"]=$row2['nome_filtro'];
            $row["descrizione_filtro"]=$row2['descrizione_filtro'];
            $row["commessa"]=$row2['commessa'];
            $row["lotto"]=$row2['lotto'];
            $row["data"]=$row2['data'];
            $row["dataString"]=$row2['data']->format('d/m/Y H:i:s');
            $row["numero_cabina"]=$row2['numero_cabina'];
            $row["id_lotto"]=$row2['id_lotto'];
            $row["id_lotto_pannello"]=$row2['id_lotto_pannello'];
            $row["numero_pannello"]=$row2['numero_pannello'];
            $row["nome_percorso"]=$row2['nome_percorso'];
            $row["descrizione_percorso"]=$row2['descrizione_percorso'];
            $row["attivo"]=$row2['attivo'];
            $row["priorita"]=$row2['priorita'];

            array_push($data,$row);
        }
    }
    else
        die("error".$query2);

    echo json_encode($data);

?>