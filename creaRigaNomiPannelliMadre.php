<?php

    include "Session.php";
    include "connessione.php";

    if ( sqlsrv_begin_transaction( $conn ) === false )
    {
        die( print_r( sqlsrv_errors(), true ));
    }

    $stmts=[];

    $q="INSERT INTO nomi_pannelli_madre (note) VALUES (NULL)";
    $r=sqlsrv_query($conn,$q);
    array_push($stmts,$r);
    if($r!==FALSE)
    {
        $q2="SELECT MAX(id_nome_pannello_madre) AS id_nome_pannello_madre FROM nomi_pannelli_madre";
        $r2=sqlsrv_query($conn,$q2);
        array_push($stmts,$r2);
        if($r2!==FALSE)
        {
            while($row2=sqlsrv_fetch_array($r2))
            {
                $id_nome_pannello_madre=$row2["id_nome_pannello_madre"];
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
        echo $id_nome_pannello_madre;
    }
    else
    {
        sqlsrv_rollback( $conn );
        echo "error";
    }

?>