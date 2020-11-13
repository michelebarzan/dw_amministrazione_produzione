
<?php

    include "Session.php";
    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];

    $query2="SELECT COUNT(numero_pannello) AS n_pannelli
            FROM dbo.view_lotti_pannelli
            WHERE (id_lotto = $id_lotto)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $rows = sqlsrv_has_rows( $result2 );
        if ($rows === true)
        {
            while($row2=sqlsrv_fetch_array($result2))
            {
                echo $row2['n_pannelli'];
            }
        }
        else 
            echo "error";
    }
    else
        die("error".$query2);

?>