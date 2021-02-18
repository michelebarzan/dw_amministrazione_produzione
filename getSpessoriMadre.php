<?php

    include "Session.php";
    include "connessione.php";

    ini_set('memory_limit', '-1');

    $columns=[];
    $colHeaders=[];

    $commesse=[];
    $q3="SELECT * FROM commesse";
    $r3=sqlsrv_query($conn,$q3);
    if($r3==FALSE)
    {
        die("error".$q3);
    }
    else
    {
        while($row3=sqlsrv_fetch_array($r3))
        {
            array_push($commesse,$row3["commessa"]);
        }
    }

    $q2="SELECT COLUMN_NAME, CASE WHEN DATA_TYPE = 'varchar' THEN 'text' ELSE 'numeric' END AS type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE (TABLE_NAME = N'spessori_madre')";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        while($row2=sqlsrv_fetch_array($r2))
        {
            array_push($colHeaders,$row2["COLUMN_NAME"]);

            $column["data"]=$row2["COLUMN_NAME"];

            if($row2["COLUMN_NAME"]=="commessa")
            {
                $column["type"]="dropdown";
                $column["source"]=$commesse;
            }
            else
                $column["type"]=$row2["type"];
            if($row2["COLUMN_NAME"]=="id_spessore_madre")
                $column["readOnly"]=true;
            else
                $column["readOnly"]=false;

            array_push($columns,$column);
        }
    }

    $data=[];

    $q="SELECT dbo.spessori_madre.id_spessore_madre, dbo.spessori_madre.finitura, dbo.spessori_madre.codice_spessore, dbo.spessori_madre.materiale, dbo.spessori_madre.spessore, dbo.spessori_madre.parametro_6, dbo.commesse.commessa FROM dbo.spessori_madre INNER JOIN dbo.commesse ON dbo.spessori_madre.commessa = dbo.commesse.id_commessa";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $rowObj=[];
            foreach ($colHeaders as $column)
            {
                $rowObj[$column]=$row[$column];
            }
            array_push($data,$rowObj);
        }
    }

    $arrayResponse["columns"]=$columns;
    $arrayResponse["colHeaders"]=$colHeaders;
    $arrayResponse["data"]=$data;

    echo json_encode($arrayResponse);

?>