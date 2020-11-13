
<?php

    include "Session.php";
    include "connessione.php";

    $id_percorso=$_REQUEST["id_percorso"];

    $stazioni=[];

    $query2="SELECT dbo.stazioni.id_stazione, dbo.stazioni.nome, dbo.stazioni.descrizione, dbo.stazioni.operativa,posizione
            FROM dbo.stazioni INNER JOIN dbo.stazioni_percorsi ON dbo.stazioni.id_stazione = dbo.stazioni_percorsi.stazione
            WHERE (dbo.stazioni_percorsi.percorso = $id_percorso) ORDER BY posizione";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $stazione["id_stazione"]=$row2['id_stazione'];
            $stazione["nome"]=$row2['nome'];
            $stazione["descrizione"]=$row2['descrizione'];
            $stazione["operativa"]=$row2['operativa'];
            $stazione["posizione"]=$row2['posizione'];

            array_push($stazioni,$stazione);
        }
    }
    else
        die("error".$query2);

    echo json_encode($stazioni);

?>