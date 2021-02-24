
<?php

    include "Session.php";
    include "connessione.php";

    $id_commessa=$_REQUEST["commessa"];
    $lotto=$_REQUEST["lotto"];

    $query1="DELETE FROM distinta_ordini_di_produzione WHERE ordine_di_produzione IN (SELECT id_ordine_di_produzione FROM ordini_di_produzione WHERE lotto=(SELECT id_lotto FROM lotti WHERE lotto='$lotto'))";
    $result1=sqlsrv_query($conn,$query1);
    if($result1===FALSE)
        die("error1".$query1);
    else
    {
        $query2="DELETE FROM ordini_di_produzione WHERE lotto=(SELECT id_lotto FROM lotti WHERE lotto='$lotto')";
        $result2=sqlsrv_query($conn,$query2);
        if($result2===FALSE)
            die("error2".$query2);
        else
        {
            $query3="DELETE FROM lotti_pannelli WHERE lotto=(SELECT id_lotto FROM lotti WHERE lotto='$lotto')";
            $result3=sqlsrv_query($conn,$query3);
            if($result3===FALSE)
                die("error3".$query3);
            else
            {
                $query4="DELETE FROM lotti WHERE lotto='$lotto'";
                $result4=sqlsrv_query($conn,$query4);
                if($result4===FALSE)
                    die("error4".$query4);
            }
        }
    }

?>