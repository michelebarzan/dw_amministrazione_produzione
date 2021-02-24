<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    $id_commessa=$_REQUEST["id_commessa"];
    $lotto=$_REQUEST["lotto"];

    $query2="SELECT * FROM lotti WHERE lotto='$lotto' AND commessa=$id_commessa";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $rows = sqlsrv_has_rows( $result2 );
        if ($rows === true)
            echo json_encode(true);
        else
            echo json_encode(false);
    }
    else
        die("error".$query2);
?>