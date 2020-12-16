
<?php

    include "Session.php";
    include "connessione.php";

    $nome=$_REQUEST["nome"];

    $query2="SELECT valore FROM parametri WHERE nome='$nome'";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            echo $row2['valore'];
        }
    }
    else
        die("error".$query2);


?>