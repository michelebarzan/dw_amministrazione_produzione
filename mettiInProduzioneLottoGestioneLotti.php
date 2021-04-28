
<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    $id_lotto=$_REQUEST["id_lotto"];
    $note=$_REQUEST["note"];
    $data_inizio_produzione=$_REQUEST["data_inizio_produzione"];
    $finestra=$_REQUEST["finestra"];
    $nome=$_REQUEST["nome"];

    $data=[];

    $query1="INSERT INTO [dbo].[ordini_di_produzione]
                ([note]
                ,[data]
                ,[utente]
                ,[data_inizio_produzione]
                ,[lotto]
                ,[finestra]
				,[nome]
				,[eliminato])
            VALUES ('$note',GETDATE(),".$_SESSION['id_utente'].",'$data_inizio_produzione',$id_lotto,$finestra,'$nome','false')";
    $result1=sqlsrv_query($conn,$query1);
    if($result1==TRUE)
    {
        $query2="SELECT nome, id_ordine_di_produzione
                FROM dbo.ordini_di_produzione
                WHERE (id_ordine_di_produzione = (SELECT MAX(id_ordine_di_produzione) AS id_ordine_di_produzione FROM dbo.ordini_di_produzione AS ordini_di_produzione_1 WHERE (utente = ".$_SESSION['id_utente'].")))";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            while($row2=sqlsrv_fetch_array($result2))
            {
                $id_ordine_di_produzione=$row2['id_ordine_di_produzione'];
                $nome=$row2['nome'];
                
                $query3="INSERT INTO [dbo].[distinta_ordini_di_produzione]
                                    ([stazione],[posizione],[numero_cabina],[pannello],[ordine_di_produzione])
                            SELECT dbo.stazioni.id_stazione, dbo.stazioni_percorsi.posizione, dbo.view_messa_in_produzione_lotti.numero_cabina, dbo.view_messa_in_produzione_lotti.id_pannello,$id_ordine_di_produzione
                        FROM dbo.stazioni INNER JOIN
                                                dbo.stazioni_percorsi ON dbo.stazioni.id_stazione = dbo.stazioni_percorsi.stazione INNER JOIN
                                                dbo.view_messa_in_produzione_lotti ON dbo.stazioni_percorsi.percorso = dbo.view_messa_in_produzione_lotti.id_percorso
                        WHERE (dbo.view_messa_in_produzione_lotti.id_lotto = $id_lotto)";

                $result3=sqlsrv_query($conn,$query3);
                if($result3===FALSE)
                    die("error".$query3);
                else
                {
                    $arrayResponse["id_ordine_di_produzione"]=$id_ordine_di_produzione;
                    $arrayResponse["nome"]=$nome;
                    echo json_encode($arrayResponse);
                }
            }
        }
        else
            die("error".$query2);
    }
    else
        die("error".$query1);

?>