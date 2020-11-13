
<?php

    include "Session.php";
    include "connessione.php";

    $id_filtro=$_REQUEST["id_filtro"];

    $percorsi=[];

    $query2="SELECT * FROM percorsi WHERE filtro=$id_filtro AND attivo='true' ORDER BY priorita DESC";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $percorso["id_percorso"]=$row2['id_percorso'];
            $percorso["nome"]=$row2['nome'];
            $percorso["descrizione"]=$row2['descrizione'];
            $percorso["attivo"]=$row2['attivo'];
            $percorso["priorita"]=$row2['priorita'];
            $percorso["filtro"]=$row2['filtro'];

            array_push($percorsi,$percorso);
        }
    }
    else
        die("error".$query2);

    echo json_encode($percorsi);

?>