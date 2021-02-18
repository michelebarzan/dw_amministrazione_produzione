<?php

    include "Session.php";
    include "connessione.php";

    if ( sqlsrv_begin_transaction( $conn ) === false )
    {
        die( print_r( sqlsrv_errors(), true ));
    }

    $stmts=[];

    $q="INSERT INTO spessori_madre (commessa) SELECT TOP(1) id_commessa FROM commesse";
    $r=sqlsrv_query($conn,$q);
    array_push($stmts,$r);
    if($r!==FALSE)
    {
        $q2="SELECT MAX(id_spessore_madre) AS id_spessore_madre FROM spessori_madre";
        $r2=sqlsrv_query($conn,$q2);
        array_push($stmts,$r2);
        if($r2!==FALSE)
        {
            while($row2=sqlsrv_fetch_array($r2))
            {
                $id_spessore_madre=$row2["id_spessore_madre"];
            }
        }
    }

    $commit=true;
    foreach ($stmts as $stmt) 
    {
        if(!$stmt)
            $commit=false;
    }
    if( $commit )
    {
        sqlsrv_commit( $conn );
        echo $id_spessore_madre;
    }
    else
    {
        sqlsrv_rollback( $conn );
        echo "error";
    }

?>