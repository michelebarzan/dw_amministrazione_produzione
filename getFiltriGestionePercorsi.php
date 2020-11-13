
<?php

    include "Session.php";
    include "connessione.php";

    $filtri=[];

    $query2="SELECT * FROM filtri_materiali_percorsi ORDER BY id_filtro DESC";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $filtro["id_filtro"]=$row2['id_filtro'];
            $filtro["nome"]=$row2['nome'];
            $filtro["descrizione"]=$row2['descrizione'];

            array_push($filtri,$filtro);
        }
    }
    else
        die("error".$query2);

    echo json_encode($filtri);

?>