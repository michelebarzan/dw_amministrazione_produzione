
<?php

    ini_set('memory_limit', '-1');
    set_time_limit(3000);

    $database="db_tecnico";
    include "connessioneDb.php";

    $tabelle=["pannelli","cabine"];
    $results=[];

    foreach ($tabelle as $tabella)
    {
        $result["tabella"]=$tabella;

        $q1="UPDATE [dbo].[$tabella] SET importazione='' WHERE importazione='in_corso'";
        $r1=sqlsrv_query($conn,$q1);
        $result["query"]=$q1;
        if($r1==FALSE)
            $result["result"]="error";
        else
            $result["result"]="ok";

        array_push($results,$result);
    }

    echo json_encode($results);
?>