
<?php

    /*ini_set('memory_limit', '-1');*/
    set_time_limit(0);

    $database="db_tecnico";
    include "connessioneDb.php";

    $srv_name="[srv].[dw_dati]";

    $tabella=$_REQUEST["tabella"];

    $start = microtime(true);

    $result["tabella"]=$tabella;

    $profili=["","_bf2","_mb"];

    foreach ($profili as $profilo)
    {
        switch ($profilo)
        {
            case '':$profiloString="mf";break;
            case '_bf2':$profiloString="bf";break;
            case '_mb':$profiloString="mb";break;
        }
        
        switch ($tabella) 
        {
            case "cesoiati" ://--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[cesoiati] ([codice_cesoiato],[descrizione],[finitura],[lung],[halt],[spess],[mmq],[um],[id_materia_prima],[profilo]) SELECT cesoiati_db.CODCES, cesoiati_db.DESCRIZIONE, cesoiati_db.FINITURA, cesoiati_db.LUNG, cesoiati_db.HALT, cesoiati_db.SPESS, cesoiati_db.MQ, cesoiati_db.UM, dbo.materie_prime.id_materia_prima, '$profiloString' FROM (SELECT cesoiati_1.CODCES, cesoiati_1.DESCRIZIONE, cesoiati_1.FINITURA, cesoiati_1.LUNG, cesoiati_1.HALT, cesoiati_1.SPESS, cesoiati_1.MQ, cesoiati_1.UM, dibces_1.CODMAT AS codice_materia_prima FROM $srv_name.dbo.cesoiati$profilo AS cesoiati_1 INNER JOIN $srv_name.dbo.dibces$profilo AS dibces_1 ON cesoiati_1.CODCES = dibces_1.CODCES) AS cesoiati_db INNER JOIN dbo.materie_prime ON cesoiati_db.codice_materia_prima = dbo.materie_prime.codice_materia_prima WHERE (cesoiati_db.CODCES NOT IN (SELECT codice_cesoiato FROM dbo.cesoiati AS cesoiati_1))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lane" ://------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lane] ([codice_lana],[descrizione],[lung],[halt],[spess],[mmq],[um],[id_materia_prima],[profilo]) SELECT mater_1.CODLDR, mater_1.DESCRIZIONE, mater_1.LUNG, mater_1.HALT, mater_1.SPESS, mater_1.MMQ, mater_1.UM, dbo.materie_prime.id_materia_prima, '$profiloString' AS profilo FROM $srv_name.dbo.mater$profilo AS mater_1 INNER JOIN dbo.materie_prime ON mater_1.CODMAT = dbo.materie_prime.codice_materia_prima WHERE (mater_1.CODLDR NOT IN (SELECT codice_lana FROM dbo.lane))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "cesoiati_r" ://--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                if($profilo!="")
                {
                    $q="INSERT INTO [dbo].[cesoiati_r] ([codice_cesoiato],[descrizione],[finitura],[lung],[halt],[spess],[mmq],[um],[id_materia_prima],[profilo]) SELECT cesoiati_r_db.CODCES, cesoiati_r_db.DESCRIZIONE, cesoiati_r_db.FINITURA, cesoiati_r_db.LUNG, cesoiati_r_db.HALT, cesoiati_r_db.SPESS, cesoiati_r_db.MQ, cesoiati_r_db.UM, dbo.materie_prime.id_materia_prima, '$profiloString' AS Expr1 FROM (SELECT cesoiati_r_1.CODCES, cesoiati_r_1.DESCRIZIONE, cesoiati_r_1.FINITURA, cesoiati_r_1.LUNG, cesoiati_r_1.HALT, cesoiati_r_1.SPESS, cesoiati_r_1.MQ, cesoiati_r_1.UM, dibces_r_1.CODMAT AS codice_materia_prima FROM $srv_name.dbo.cesoiati_r$profilo AS cesoiati_r_1 INNER JOIN $srv_name.dbo.dibces_r$profilo AS dibces_r_1 ON cesoiati_r_1.CODCES = dibces_r_1.CODCES) AS cesoiati_r_db INNER JOIN dbo.materie_prime ON cesoiati_r_db.codice_materia_prima = dbo.materie_prime.codice_materia_prima WHERE (cesoiati_r_db.CODCES NOT IN (SELECT codice_cesoiato FROM dbo.cesoiati_r AS cesoiati_r_1))";
                    $r=sqlsrv_query($conn,$q);
                    $result["query_".$profilo]=$q;
                    if($r==FALSE)
                    {
                        $result["result_".$profilo]="error";
                        $result["rows_".$profilo]=0;
                    }
                    else
                    {
                        $result["result_".$profilo]="ok";
                        $rows = sqlsrv_rows_affected( $r);
                        if( $rows === false)
                            $result["rows_".$profilo]=false;
                        elseif( $rows == -1)
                            $result["rows_".$profilo]=false;
                        else
                            $result["rows_".$profilo]=$rows;
                    }
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $result["rows_".$profilo]=false;
                }
            break;
            case "rinforzi" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[rinforzi] ([codice_rinforzo],[descrizione],[qnt],[um],[id_materia_prima],[profilo]) SELECT tabrinf_1.CODRIN AS Expr1, tabrinf_1.DESCRIZIONE AS Expr2, tabrinf_1.QNT AS Expr3, tabrinf_1.UM AS Expr4, dbo.materie_prime.id_materia_prima, '$profiloString' AS Expr5 FROM $srv_name.dbo.tabrinf$profilo AS tabrinf_1 INNER JOIN dbo.materie_prime ON tabrinf_1.CODMAT = dbo.materie_prime.codice_materia_prima WHERE (tabrinf_1.CODRIN NOT IN (SELECT codice_rinforzo FROM dbo.rinforzi))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
                break;
            break;
            case "profili" :
                $q="INSERT INTO [dbo].[profili] ([codice_profilo],[descrizione],[id_materia_prima],[finitura],[lunghezza],[larghezza],[profilo]) SELECT profili_1.codpro, profili_1.descrizione, dbo.materie_prime.id_materia_prima, profili_1.finitura, profili_1.lunghezza, profili_1.larghezza, '$profiloString' AS Expr1 FROM $srv_name.dbo.profili$profilo AS profili_1 INNER JOIN dbo.materie_prime ON profili_1.materiale = dbo.materie_prime.codice_materia_prima WHERE (profili_1.codpro NOT IN (SELECT codice_profilo FROM dbo.profili))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lavorazioni_lana" ://------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lavorazioni_lana] ([codice_lavorazione_lana],[descrizione],[misura_1],[misura_2],[misura_3],[misura_4],[misura_5],[id_lana]) SELECT DIBldr_1.CODMAT AS Expr1, 'lavorazione' AS descrizione_lavorazione, DIBldr_1.LUNG AS Expr2, DIBldr_1.HALT AS Expr3, DIBldr_1.SPESS AS Expr4, DIBldr_1.MMQ AS Expr5, NULL AS misura_5, dbo.lane.id_lana FROM $srv_name.dbo.DIBldr$profilo AS DIBldr_1 INNER JOIN dbo.lane ON DIBldr_1.CODLDR = dbo.lane.codice_lana WHERE (DIBldr_1.CODMAT NOT LIKE '+%') AND (dbo.lane.id_lana NOT IN (SELECT DISTINCT id_lana FROM dbo.lavorazioni_lana))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "sviluppi" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[sviluppi] ([codice_sviluppo],[lung],[spess],[halt],[finitura],[fori],[note],[righe],[tipo],[um],[id_cesoiato],[descrizione],[profilo]) SELECT sviluppi_2.CODSVI AS Expr1, sviluppi_2.LUNG AS Expr2, sviluppi_2.SPESS AS Expr3, sviluppi_2.HALT AS Expr4, sviluppi_2.FINITURA AS Expr5, sviluppi_2.FORI AS Expr6, sviluppi_2.___ AS note, sviluppi_2.RIGHE AS Expr7, sviluppi_2.TIPO AS Expr8, sviluppi_2.UM AS Expr9, dbo.cesoiati.id_cesoiato, sviluppi_2.DESCRIZIONE AS Expr10, '$profiloString' AS Expr11 FROM $srv_name.dbo.sviluppi$profilo AS sviluppi_2 INNER JOIN $srv_name.dbo.dibsvi$profilo AS dibsvi_1 ON sviluppi_2.CODSVI = dibsvi_1.CODSVI INNER JOIN dbo.cesoiati ON dibsvi_1.CODELE = dbo.cesoiati.codice_cesoiato WHERE (sviluppi_2.CODSVI NOT IN (SELECT codice_sviluppo FROM dbo.sviluppi AS sviluppi_1))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "sviluppi_r" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                if($profilo!="")
                {
                    $q="INSERT INTO [dbo].[sviluppi_r] ([codice_sviluppo],[lung],[spess],[halt],[finitura],[fori],[note],[righe],[tipo],[um],[id_cesoiato_r],[descrizione],[profilo]) SELECT sviluppi_r_2.CODSVI AS Expr1, sviluppi_r_2.LUNG AS Expr2, sviluppi_r_2.SPESS AS Expr3, sviluppi_r_2.HALT AS Expr4, sviluppi_r_2.FINITURA AS Expr5, sviluppi_r_2.FORI AS Expr6, sviluppi_r_2.___ AS note, sviluppi_r_2.RIGHE AS Expr7, sviluppi_r_2.TIPO AS Expr8, sviluppi_r_2.UM AS Expr9, dbo.cesoiati_r.id_cesoiato_r, sviluppi_r_2.DESCRIZIONE AS Expr10, '$profiloString' AS Expr11 FROM $srv_name.dbo.sviluppi_r$profilo AS sviluppi_r_2 INNER JOIN $srv_name.dbo.dibsvi_r$profilo AS dibsvi_r_1 ON sviluppi_r_2.CODSVI = dibsvi_r_1.CODSVI INNER JOIN dbo.cesoiati_r ON dibsvi_r_1.CODELE = dbo.cesoiati_r.codice_cesoiato WHERE (sviluppi_r_2.CODSVI NOT IN (SELECT codice_sviluppo FROM dbo.sviluppi_r AS sviluppi_r_1))";
                    $r=sqlsrv_query($conn,$q);
                    $result["query_".$profilo]=$q;
                    if($r==FALSE)
                    {
                        $result["result_".$profilo]="error";
                        $result["rows_".$profilo]=0;
                    }
                    else
                    {
                        $result["result_".$profilo]="ok";
                        $rows = sqlsrv_rows_affected( $r);
                        if( $rows === false)
                            $result["rows_".$profilo]=false;
                        elseif( $rows == -1)
                            $result["rows_".$profilo]=false;
                        else
                            $result["rows_".$profilo]=$rows;
                    }
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $result["rows_".$profilo]=false;
                }
            break;
            case "lavorazioni_sviluppi" ://--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lavorazioni_sviluppi] ([codice_lavorazione_sviluppo],[descrizione],[misura_1],[misura_2],[misura_3],[misura_4],[misura_5],[id_sviluppo]) SELECT dibsvi_1.CODELE AS Expr1, 'lavorazione' AS descrizione_lavorazione, dibsvi_1.DIMX AS Expr2, dibsvi_1.DIMY AS Expr3, dibsvi_1.QNT AS Expr4, dibsvi_1.POSX AS Expr5, dibsvi_1.POSY AS Expr6, dbo.sviluppi.id_sviluppo FROM $srv_name.dbo.dibsvi$profilo AS dibsvi_1 INNER JOIN dbo.sviluppi ON dibsvi_1.CODSVI = dbo.sviluppi.codice_sviluppo WHERE (dbo.sviluppi.id_sviluppo NOT IN (SELECT DISTINCT id_sviluppo FROM dbo.lavorazioni_sviluppi)) AND (dibsvi_1.CODELE NOT LIKE '+%')";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lavorazioni_sviluppi_r" ://--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                if($profilo!="")
                {
                    $q="INSERT INTO [dbo].[lavorazioni_sviluppi_r] ([codice_lavorazione_sviluppo],[descrizione],[misura_1],[misura_2],[misura_3],[misura_4],[misura_5],[id_sviluppo_r]) SELECT dibsvi_r_1.CODELE AS Expr1, 'lavorazione' AS descrizione_lavorazione, dibsvi_r_1.DIMX AS Expr2, dibsvi_r_1.DIMY AS Expr3, dibsvi_r_1.QNT AS Expr4, dibsvi_r_1.POSX AS Expr5, dibsvi_r_1.POSY AS Expr6, dbo.sviluppi_r.id_sviluppo_r FROM $srv_name.dbo.dibsvi_r$profilo AS dibsvi_r_1 INNER JOIN dbo.sviluppi_r ON dibsvi_r_1.CODSVI = dbo.sviluppi_r.codice_sviluppo WHERE (dbo.sviluppi_r.id_sviluppo_r NOT IN (SELECT DISTINCT id_sviluppo_r FROM dbo.lavorazioni_sviluppi_r)) AND (dibsvi_r_1.CODELE NOT LIKE '+%')";
                    $r=sqlsrv_query($conn,$q);
                    $result["query_".$profilo]=$q;
                    if($r==FALSE)
                    {
                        $result["result_".$profilo]="error";
                        $result["rows_".$profilo]=0;
                    }
                    else
                    {
                        $result["result_".$profilo]="ok";
                        $rows = sqlsrv_rows_affected( $r);
                        if( $rows === false)
                            $result["rows_".$profilo]=false;
                        elseif( $rows == -1)
                            $result["rows_".$profilo]=false;
                        else
                            $result["rows_".$profilo]=$rows;
                    }
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $result["rows_".$profilo]=false;
                }
            break;
            case "lamiere" ://----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lamiere] ([codice_lamiera],[descrizione],[lung1],[lung2],[spess],[halt],[ang],[finitura],[note],[righe],[tipo],[um],[id_sviluppo],[fori],[profilo]) SELECT pannellil_1.CODPAN AS Expr1, pannellil_1.DESCRIZIONE AS Expr2, pannellil_1.LUNG1 AS Expr3, pannellil_1.LUNG2 AS Expr4, pannellil_1.SPESS AS Expr5, pannellil_1.HALT AS Expr6, pannellil_1.ANG AS Expr7, pannellil_1.FINITURA AS Expr8, pannellil_1.___ AS Expr9, pannellil_1.RIGHE AS Expr10, pannellil_1.TIPO AS Expr11, pannellil_1.UM AS Expr12, dbo.sviluppi.id_sviluppo, pannellil_1.FORI AS Expr13, '$profiloString' AS Expr14 FROM $srv_name.dbo.pannellil$profilo AS pannellil_1 INNER JOIN $srv_name.dbo.DIBpan$profilo AS DIBpan_1 ON pannellil_1.CODPAN = DIBpan_1.CODPAN INNER JOIN dbo.sviluppi ON DIBpan_1.CODELE = dbo.sviluppi.codice_sviluppo WHERE (pannellil_1.CODPAN NOT IN (SELECT codice_lamiera FROM dbo.lamiere))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lamiere_r" ://----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                if($profilo!="")
                {
                    $q="INSERT INTO [dbo].[lamiere_r] ([codice_lamiera],[descrizione],[lung1],[lung2],[spess],[halt],[ang],[finitura],[note],[righe],[tipo],[um],[id_sviluppo_r],[fori],[profilo]) SELECT pannellil_r_1.CODPAN AS Expr1, pannellil_r_1.DESCRIZIONE AS Expr2, pannellil_r_1.LUNG1 AS Expr3, pannellil_r_1.LUNG2 AS Expr4, pannellil_r_1.SPESS AS Expr5, pannellil_r_1.HALT AS Expr6, pannellil_r_1.ANG AS Expr7, pannellil_r_1.FINITURA AS Expr8, pannellil_r_1.___ AS Expr9, pannellil_r_1.RIGHE AS Expr10, pannellil_r_1.TIPO AS Expr11, pannellil_r_1.UM AS Expr12, dbo.sviluppi_r.id_sviluppo_r, pannellil_r_1.FORI AS Expr13, '$profiloString' AS Expr14 FROM $srv_name.dbo.pannellil_r$profilo AS pannellil_r_1 INNER JOIN $srv_name.dbo.DIBpan_r$profilo AS DIBpan_r_1 ON pannellil_r_1.CODPAN = DIBpan_r_1.CODPAN INNER JOIN dbo.sviluppi_r ON DIBpan_r_1.CODELE = dbo.sviluppi_r.codice_sviluppo WHERE (pannellil_r_1.CODPAN NOT IN (SELECT codice_lamiera FROM dbo.lamiere_r))";
                    $r=sqlsrv_query($conn,$q);
                    $result["query_".$profilo]=$q;
                    if($r==FALSE)
                    {
                        $result["result_".$profilo]="error";
                        $result["rows_".$profilo]=0;
                    }
                    else
                    {
                        $result["result_".$profilo]="ok";
                        $rows = sqlsrv_rows_affected( $r);
                        if( $rows === false)
                            $result["rows_".$profilo]=false;
                        elseif( $rows == -1)
                            $result["rows_".$profilo]=false;
                        else
                            $result["rows_".$profilo]=$rows;
                    }
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $result["rows_".$profilo]=false;
                }
            break;
            case "lavorazioni_lamiere" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lavorazioni_lamiere] ([codice_lavorazione_lamiera],[descrizione],[misura_1],[misura_2],[misura_3],[misura_4],[misura_5] ,[id_lamiera]) SELECT DIBpan_1.CODELE AS Expr1, 'lavorazione' AS descrizione_lavorazione, DIBpan_1.DIMX AS Expr2, DIBpan_1.DIMY AS Expr3, DIBpan_1.QNT AS Expr4, DIBpan_1.POSX AS Expr5, DIBpan_1.POSY AS Expr6, dbo.lamiere.id_lamiera FROM $srv_name.dbo.DIBpan$profilo AS DIBpan_1 INNER JOIN dbo.lamiere ON DIBpan_1.CODPAN = dbo.lamiere.codice_lamiera WHERE (DIBpan_1.CODELE NOT LIKE '+%') AND (dbo.lamiere.id_lamiera NOT IN (SELECT DISTINCT id_lamiera FROM dbo.lavorazioni_lamiere)) AND (DIBpan_1.CODELE NOT LIKE 'SM%')";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lavorazioni_lamiere_r" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                if($profilo!="")
                {
                    $q="INSERT INTO [dbo].[lavorazioni_lamiere_r] ([codice_lavorazione_lamiera],[descrizione],[misura_1],[misura_2],[misura_3],[misura_4],[misura_5] ,[id_lamiera_r]) SELECT DIBpan_r_1.CODELE AS Expr1, 'lavorazione' AS descrizione_lavorazione, DIBpan_r_1.DIMX AS Expr2, DIBpan_r_1.DIMY AS Expr3, DIBpan_r_1.QNT AS Expr4, DIBpan_r_1.POSX AS Expr5, DIBpan_r_1.POSY AS Expr6, dbo.lamiere_r.id_lamiera_r FROM $srv_name.dbo.DIBpan_r$profilo AS DIBpan_r_1 INNER JOIN dbo.lamiere_r ON DIBpan_r_1.CODPAN = dbo.lamiere_r.codice_lamiera WHERE (DIBpan_r_1.CODELE NOT LIKE '+%') AND (dbo.lamiere_r.id_lamiera_r NOT IN (SELECT DISTINCT id_lamiera_r FROM dbo.lavorazioni_lamiere_r)) AND (DIBpan_r_1.CODELE NOT LIKE 'SM%')";
                    $r=sqlsrv_query($conn,$q);
                    $result["query_".$profilo]=$q;
                    if($r==FALSE)
                    {
                        $result["result_".$profilo]="error";
                        $result["rows_".$profilo]=0;
                    }
                    else
                    {
                        $result["result_".$profilo]="ok";
                        $rows = sqlsrv_rows_affected( $r);
                        if( $rows === false)
                            $result["rows_".$profilo]=false;
                        elseif( $rows == -1)
                            $result["rows_".$profilo]=false;
                        else
                            $result["rows_".$profilo]=$rows;
                    }
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $result["rows_".$profilo]=false;
                }
            break;
            case "pannelli" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[pannelli]([codice_pannello],[descrizione],[resis],[um],[righe],[descrizionetec],[finitura],[halt],[fori],[utente],[id_lamiera],[importazione],[id_lamiera_r],[profilo]) SELECT pannelli_2.CODPAS, pannelli_2.DESCRIZIONE, pannelli_2.RESIS, pannelli_2.UM, pannelli_2.RIGHE, pannelli_2.DESCRIZIONETEC, pannelli_2.FINITURA, pannelli_2.HALT, pannelli_2.FORI, pannelli_2.UTENTE, dbo.lamiere.id_lamiera, 'in_corso' AS Expr10, dbo.lamiere_r.id_lamiera_r, '$profiloString' AS profilo FROM dbo.lamiere_r INNER JOIN $srv_name.dbo.dibpas$profilo AS dibpas_1 ON dbo.lamiere_r.codice_lamiera = dibpas_1.CODELE RIGHT OUTER JOIN $srv_name.dbo.pannelli$profilo AS pannelli_2 INNER JOIN dbo.lamiere ON pannelli_2.CODLAM = dbo.lamiere.codice_lamiera ON dibpas_1.CODPAS = pannelli_2.CODPAS WHERE (pannelli_2.CODPAS NOT IN (SELECT codice_pannello FROM dbo.pannelli AS pannelli_1))";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=false;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "cabine" ://-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[cabine] ([codice_cabina],[descrizione],[um],[importazione],[profilo]) SELECT CODCAB, DESCRIZIONE, UM, 'in_corso', '$profiloString' FROM $srv_name.dbo.cabine$profilo WHERE (CODCAB NOT IN (SELECT codice_cabina FROM dbo.cabine AS cabine_1))";
				$r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=false;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "materie_prime_pannelli" ://-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[materie_prime_pannelli] ([id_pannello],[id_materia_prima],[qnt],[posx],[posy],[dimx],[dimy]) SELECT pannelli.id_pannello, dbo.materie_prime.id_materia_prima, DIBpaS_1.QNT AS Expr1, DIBpaS_1.POSX AS Expr2, DIBpaS_1.POSY AS Expr3, DIBpaS_1.DIMX AS Expr4, DIBpaS_1.DIMY AS Expr5 FROM $srv_name.dbo.DIBpaS$profilo AS DIBpaS_1 INNER JOIN (SELECT id_pannello, codice_pannello, descrizione, resis, um, righe, descrizionetec, finitura, halt, fori, id_lamiera, importazione FROM dbo.pannelli AS pannelli_1 WHERE (importazione = 'in_corso')) AS pannelli ON DIBpaS_1.CODPAS = pannelli.codice_pannello INNER JOIN dbo.materie_prime ON DIBpaS_1.CODELE = dbo.materie_prime.codice_materia_prima";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "profili_pannelli" ://-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[profili_pannelli] ([id_pannello],[id_profilo],[qnt],[posx],[posy],[dimx],[dimy]) SELECT pannelli.id_pannello, dbo.profili.id_profilo, dibpas_1.QNT, dibpas_1.POSX, dibpas_1.POSY, dibpas_1.DIMX, dibpas_1.DIMY FROM (SELECT id_pannello, codice_pannello, descrizione, resis, um, righe, descrizionetec, finitura, halt, fori, utente, id_lamiera, importazione, id_lamiera_r, profilo FROM dbo.pannelli AS pannelli_1 WHERE (importazione = 'in_corso')) AS pannelli INNER JOIN $srv_name.dbo.DIBpaS$profilo AS dibpas_1 ON pannelli.codice_pannello = dibpas_1.CODPAS INNER JOIN dbo.profili ON dibpas_1.CODELE = dbo.profili.codice_profilo";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "profili_cabine" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[profili_cabine] ([id_cabina],[id_profilo],[qnt],[pos]) SELECT cabine.id_cabina, dbo.profili.id_profilo, cabpan_1.QNT, cabpan_1.POS FROM (SELECT id_cabina, codice_cabina, descrizione, um, importazione FROM dbo.cabine AS cabine_1 WHERE (importazione = 'in_corso')) AS cabine INNER JOIN $srv_name.dbo.cabpan$profilo AS cabpan_1 ON cabine.codice_cabina = cabpan_1.CODCAB INNER JOIN dbo.profili ON cabpan_1.CODKIT = dbo.profili.codice_profilo";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "materie_prime_cabine" ://---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[materie_prime_cabine] ([id_cabina],[id_materia_prima],[qnt],[pos]) SELECT cabine.id_cabina, dbo.materie_prime.id_materia_prima, cabpan_1.QNT, cabpan_1.POS FROM (SELECT id_cabina, codice_cabina, descrizione, um, importazione FROM dbo.cabine AS cabine_1 WHERE (importazione = 'in_corso')) AS cabine INNER JOIN $srv_name.dbo.cabpan$profilo AS cabpan_1 ON cabine.codice_cabina = cabpan_1.CODCAB INNER JOIN dbo.materie_prime ON cabpan_1.CODKIT = dbo.materie_prime.codice_materia_prima";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "lane_pannelli" ://----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[lane_pannelli] ([id_pannello],[id_lana],[qnt],[posx],[posy]) SELECT pannelli.id_pannello, dbo.lane.id_lana, DIBpaS_1.QNT AS Expr1, DIBpaS_1.POSX AS Expr2, DIBpaS_1.POSY AS Expr3 FROM $srv_name.dbo.DIBpaS$profilo AS DIBpaS_1 INNER JOIN dbo.lane ON DIBpaS_1.CODELE = dbo.lane.codice_lana INNER JOIN (SELECT id_pannello, codice_pannello, descrizione, resis, um, righe, descrizionetec, finitura, halt, fori, id_lamiera, importazione FROM dbo.pannelli AS pannelli_1 WHERE (importazione = 'in_corso')) AS pannelli ON DIBpaS_1.CODPAS = pannelli.codice_pannello";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "rinforzi_pannelli" ://------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[rinforzi_pannelli] ([id_pannello],[id_rinforzo],[qnt],[posx],[posy]) SELECT pannelli.id_pannello, dbo.rinforzi.id_rinforzo, DIBpaS_1.QNT AS Expr1, DIBpaS_1.POSX AS Expr2, DIBpaS_1.POSY AS Expr3 FROM (SELECT id_pannello, codice_pannello, descrizione, resis, um, righe, descrizionetec, finitura, halt, fori, id_lamiera, importazione FROM dbo.pannelli AS pannelli_1 WHERE (importazione = 'in_corso')) AS pannelli INNER JOIN $srv_name.dbo.DIBpaS$profilo AS DIBpaS_1 ON pannelli.codice_pannello = DIBpaS_1.CODPAS INNER JOIN dbo.rinforzi ON DIBpaS_1.CODELE = dbo.rinforzi.codice_rinforzo";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
            case "pannelli_cabine" ://--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                $q="INSERT INTO [dbo].[pannelli_cabine] ([id_cabina],[id_pannello],[qnt],[pos]) SELECT cabine.id_cabina, dbo.pannelli.id_pannello, cabpan_1.QNT, cabpan_1.POS FROM $srv_name.dbo.cabpan$profilo AS cabpan_1 INNER JOIN dbo.pannelli ON cabpan_1.CODKIT = dbo.pannelli.codice_pannello INNER JOIN (SELECT id_cabina, codice_cabina, descrizione, um, importazione FROM dbo.cabine AS cabine_1 WHERE (importazione = 'in_corso')) AS cabine ON cabpan_1.CODCAB = cabine.codice_cabina";
                $r=sqlsrv_query($conn,$q);
                $result["query_".$profilo]=$q;
                if($r==FALSE)
                {
                    $result["result_".$profilo]="error";
                    $result["rows_".$profilo]=0;
                }
                else
                {
                    $result["result_".$profilo]="ok";
                    $rows = sqlsrv_rows_affected( $r);
                    if( $rows === false)
                        $result["rows_".$profilo]=false;
                    elseif( $rows == -1)
                        $result["rows_".$profilo]=false;
                    else
                        $result["rows_".$profilo]=$rows;
                }
            break;
        }
    }

    $result["result"]="ok";
    $result["rows"]=0;
    foreach ($profili as $profilo)
    {
        if($result["result_".$profilo]=="error")
            $result["result"]="error";
        $result["rows"]+=$result["rows_".$profilo];
    }

    $time_elapsed_secs = microtime(true) - $start;
    $time_elapsed_secs = number_format($time_elapsed_secs,1);

    $result["time_elapsed_secs"]=$time_elapsed_secs;
    echo json_encode($result);

?>