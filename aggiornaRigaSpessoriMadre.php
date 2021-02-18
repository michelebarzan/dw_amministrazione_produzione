<?php

    include "Session.php";
    include "connessione.php";

    $id_spessore_madre=$_REQUEST["id_spessore_madre"];
    $colonna=$_REQUEST["colonna"];
    $valore=$_REQUEST["valore"];

    if($colonna=="commessa")
    {
        $stmt = sqlsrv_query( $conn, "SELECT * FROM commesse WHERE commessa='$valore'");

        if ($stmt)
        {
            $rows = sqlsrv_has_rows( $stmt );
            if ($rows === true)
            {
                $q="UPDATE spessori_madre SET [$colonna]=(SELECT MAX(id_commessa) FROM commesse WHERE commessa='$valore') WHERE id_spessore_madre = $id_spessore_madre";
                $r=sqlsrv_query($conn,$q);
                if($r==FALSE)
                {
                    die("error".$q);
                }
            }
        }
        else
            die("error");
    }
    else
    {
        $q="UPDATE spessori_madre SET [$colonna]='$valore' WHERE id_spessore_madre = $id_spessore_madre";
        $r=sqlsrv_query($conn,$q);
        if($r==FALSE)
        {
            die("error".$q);
        }
    }

?>