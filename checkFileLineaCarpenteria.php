<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    //PartsReport
    $percorsoRispostaFileLineaCarpenteria1=getParametro("percorsoRispostaFileLineaCarpenteria1",$conn);
    $nomeRispostaFileLineaCarpenteria1=getParametro("nomeRispostaFileLineaCarpenteria1",$conn);

    $partNameArray1=[];
    $datesArray1=[];

    $fileLineaCarpenteria1 = fopen($percorsoRispostaFileLineaCarpenteria1.$nomeRispostaFileLineaCarpenteria1,"r");
    $i=0;
    while(! feof($fileLineaCarpenteria1))
    {
        $rowString=fgetcsv($fileLineaCarpenteria1);
        if($i>=7)
        {
            $rowArray=explode(";",$rowString[0]);

            if(sizeof($rowArray)==10)
            {
                array_push($partNameArray1,$rowArray[0]);

                $datesRow1["Part name"]=$rowArray[0];
                $datesRow1["Last production time"]=date("Y-m-d H:i", strtotime($rowArray[1]));
                $datesRow1["Total production time"]=getSeconds(date("H:i:s", strtotime($rowArray[4])));
                
                array_push($datesArray1,$datesRow1);
            }
        }
        $i++;
    }

    fclose($fileLineaCarpenteria1);

    //ProductionOrdersReport
    $percorsoRispostaFileLineaCarpenteria2=getParametro("percorsoRispostaFileLineaCarpenteria2",$conn);
    $nomeRispostaFileLineaCarpenteria2=getParametro("nomeRispostaFileLineaCarpenteria2",$conn);

    $partNameArray2=[];
    $datesArray2=[];

    $fileLineaCarpenteria2 = fopen($percorsoRispostaFileLineaCarpenteria2.$nomeRispostaFileLineaCarpenteria2,"r");
    $i=0;
    while(! feof($fileLineaCarpenteria2))
    {
        $rowString=fgetcsv($fileLineaCarpenteria2);
        if($i>=7)
        {
            $rowArray=explode(";",$rowString[0]);

            if(sizeof($rowArray)==11)
            {
                array_push($partNameArray2,$rowArray[2]);

                $datesRow2["Part name"]=$rowArray[2];
                $datesRow2["Started time"]["time"]=new DateTime($rowArray[7]);
                $datesRow2["Finished time"]["time"]=new DateTime($rowArray[8]);
                $datesRow2["Started time"]["date"]=date("Y-m-d H:i", strtotime($rowArray[7]));
                $datesRow2["Finished time"]["date"]=date("Y-m-d H:i", strtotime($rowArray[8]));
                $datesRow2["Started time"]["string"]=$rowArray[7];
                $datesRow2["Finished time"]["string"]=$rowArray[8];
                array_push($datesArray2,$datesRow2);
            }
        }
        $i++;
    }

    fclose($fileLineaCarpenteria2);

    $queries=[];
    foreach ($datesArray1 as $row)
    {
        $query="UPDATE distinta_ordini_di_produzione SET dataFine='".$row['Last production time']."', tempo_2=".$row['Total production time']." WHERE id_distinta=".$row['Part name'];
        array_push($queries,$query);
    }
    foreach ($datesArray2 as $row)
    {
        $tempo_lordo= abs(($row['Started time']['time'])->getTimestamp() - ($row['Finished time']['time'])->getTimestamp());

        $qnt_nesting=getQntNesting($datesArray2,$row["Started time"]["string"],$row["Finished time"]["string"]);
        $tempo_1=$tempo_lordo/$qnt_nesting;
        
        $query="UPDATE distinta_ordini_di_produzione SET dataInizio='".$row['Started time']['date']."', tempo_lordo=$tempo_lordo, tempo_1=$tempo_1 WHERE id_distinta=".$row['Part name'];
        array_push($queries,$query);
    }

    $results=[];
    foreach ($queries as $query)
    {
        $result=sqlsrv_query($conn,$query);
        if($result==TRUE)
        {
            $resultObj["query"]=$query;
            $resultObj["res"]=true;
            array_push($results,$resultObj);
        }
        else
        {
            $resultObj["query"]=$query;
            $resultObj["res"]=false;
            array_push($results,$resultObj);
        }
    }

    $arrayResponse["queries"]=$queries;
    $arrayResponse["results"]=$results;
    $arrayResponse["partNameArray1"]=$partNameArray1;
    $arrayResponse["datesArray1"]=$datesArray1;
    $arrayResponse["partNameArray2"]=$partNameArray2;
    $arrayResponse["datesArray2"]=$datesArray2;

    echo json_encode($arrayResponse);

    function getParametro($nome,$conn)
    {
        $query2="SELECT valore FROM parametri WHERE nome='$nome'";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            while($row2=sqlsrv_fetch_array($result2))
            {
                return $row2['valore'];
            }
        }
        else
            die("error".$query2);
    }
    function getSeconds($str_time)
    {
        $str_time = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $str_time);

        sscanf($str_time, "%d:%d:%d", $hours, $minutes, $seconds);

        $time_seconds = $hours * 3600 + $minutes * 60 + $seconds;

        return $time_seconds;
    }
    function getQntNesting($array,$data1,$data2)
    {
        $count=0;
        foreach ($array as $row)
        {
            if($data1==$row["Started time"]["string"] && $data2==$row["Finished time"]["string"])
                $count++;
        }
        return $count;
    }
?>