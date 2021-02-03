<?php

    include "connessione.php";

    $id_commessa=$_REQUEST["id_commessa"];

    //$filtriCabine=[];

    $query2="SELECT DISTINCT ponte FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["ponte"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["ponte"]=$filtro;
    }
    else
        die("error1".$query2);

    $query2="SELECT DISTINCT firezone FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["firezone"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["firezone"]=$filtro;
    }
    else
        die("error2");

    $query2="SELECT DISTINCT kit_cabina FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa AND kit_cabina IS NOT NULL";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["kit_cabina"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["kit_cabina"]=$filtro;
    }
    else
        die("error2");

    $query2="SELECT DISTINCT tipo FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["tipo"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["tipo"]=$filtro;
    }
    else
        die("error3");

    $query2="SELECT DISTINCT verso FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["verso"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["verso"]=$filtro;
    }
    else
        die("error4");

    $query2="SELECT DISTINCT lato_nave FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["lato_nave"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["lato_nave"]=$filtro;
    }
    else
        die("error5");

    $query2="SELECT DISTINCT finitura_A FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["finitura_A"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["finitura_A"]=$filtro;
    }
    else
        die("error6");

    $query2="SELECT DISTINCT finitura_B FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["finitura_B"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["finitura_B"]=$filtro;
    }
    else
        die("error7");

    $query2="SELECT DISTINCT finitura_C FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["finitura_C"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["finitura_C"]=$filtro;
    }
    else
        die("error8");

    $query2="SELECT DISTINCT settimana FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["settimana"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["settimana"]=$filtro;
    }
    else
        die("error9");

    $query2="SELECT DISTINCT famiglia FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["famiglia"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["famiglia"]=$filtro;
    }
    else
        die("error10");

    $query2="SELECT DISTINCT piano_montaggio FROM srv.dw_dati.dbo.general_numbering WHERE commessa=$id_commessa";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $filtro=[];
		while($row2=sqlsrv_fetch_array($result2))
        {
            $element["valore"]=$row2["piano_montaggio"];
            $element["checked"]=true;
            array_push($filtro,$element);
        }
        $filtriCabine["piano_montaggio"]=$filtro;
    }
    else
        die("error11");

    echo json_encode($filtriCabine);

?>