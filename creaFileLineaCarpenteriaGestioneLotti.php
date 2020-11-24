
<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(300);

    $id_ordine_di_produzione=$_REQUEST["id_ordine_di_produzione"];

    $data=[];

    $intestazioni=["OrderID","PartName","QuantityOrdered","QuantityNested","QuantityCompleted","ExtraAllowed","Machine","AssemblyID","DueDate","DateWindow","Priority","ForcedPriority","NextPhase","Status","Material","Thickness","AutoTooling","ScriptTooling","ScriptName","ManualNesting","Drawing","Turret","ProductionLabel","Revision","Note","BendingMode","BendingParameters","StaticNestID","Parameter0","Parameter1","Parameter2","Parameter3","Parameter4","Parameter5","Parameter6","Parameter7"];
    array_push($data,$intestazioni);

    $query1="SELECT        TOP (100) PERCENT OrderID, PartName, COUNT(PartName) AS QuantityOrdered, QuantityNested, QuantityCompleted, ExtraAllowed, Machine, AssemblyID, DueDate, DateWindow, Priority, ForcedPriority, NextPhase, Status, 
    Material, Thickness, AutoTooling, ScriptTooling, ScriptName, ManualNesting, Drawing, Turret, ProductionLabel, Revision, Note, BendingMode, BendingParameters, StaticNestID, Parameter0, Parameter1, Parameter2, 
    Parameter3, Parameter4, Parameter5, Parameter6, Parameter7
FROM            (SELECT        TOP (100) PERCENT dbo.ordini_di_produzione.nome AS OrderID, dbo.pannelli.codice_pannello AS PartName,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria
                                     WHERE        (nome = 'QuantityNested')) AS QuantityNested,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_21
                                     WHERE        (nome = 'QuantityCompleted')) AS QuantityCompleted,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_20
                                     WHERE        (nome = 'ExtraAllowed')) AS ExtraAllowed,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_19
                                     WHERE        (nome = 'Machine')) AS Machine, dbo.distinta_ordini_di_produzione.numero_cabina AS AssemblyID, dbo.ordini_di_produzione.data_inizio_produzione AS DueDate, 
                               dbo.ordini_di_produzione.finestra AS DateWindow,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_18
                                     WHERE        (nome = 'Priority')) AS Priority,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_17
                                     WHERE        (nome = 'ForcedPriority')) AS ForcedPriority,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_16
                                     WHERE        (nome = 'NextPhase')) AS NextPhase,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_15
                                     WHERE        (nome = 'Status')) AS Status, dbo.pannelli_madre.materiale AS Material, dbo.pannelli_madre.spessore AS Thickness,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_14
                                     WHERE        (nome = 'AutoTooling')) AS AutoTooling,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_13
                                     WHERE        (nome = 'ScriptTooling')) AS ScriptTooling,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_13
                                     WHERE        (nome = 'ScriptName')) AS ScriptName,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_12
                                     WHERE        (nome = 'ManualNesting')) AS ManualNesting, { fn CONCAT
                                   ((SELECT        valore
                                       FROM            dbo.parametri
                                       WHERE        (nome = 'percorso_dxf')), dbo.pannelli_madre.CODSVI) } AS Drawing,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_11
                                     WHERE        (nome = 'Turret')) AS Turret, { fn CONCAT(dbo.lotti.lotto, { fn CONCAT('_', dbo.pannelli.codice_pannello) }) } AS ProductionLabel, '?' AS Revision,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_1
                                     WHERE        (nome = 'BendingMode')) AS BendingMode, dbo.pannelli_madre.pannello_madre AS BendingParameters,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_10
                                     WHERE        (nome = 'StaticNestID')) AS StaticNestID,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_9
                                     WHERE        (nome = 'Parameter0')) AS Parameter0,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_8
                                     WHERE        (nome = 'Parameter1')) AS Parameter1,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_7
                                     WHERE        (nome = 'Parameter2')) AS Parameter2,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_7
                                     WHERE        (nome = 'Parameter3')) AS Parameter3,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_5
                                     WHERE        (nome = 'Parameter4')) AS Parameter4,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_4
                                     WHERE        (nome = 'Parameter5')) AS Parameter5,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_3
                                     WHERE        (nome = 'Parameter6')) AS Parameter6,
                                   (SELECT        valore
                                     FROM            dbo.parametri_linea_carpenteria AS parametri_linea_carpenteria_2
                                     WHERE        (nome = 'Parameter7')) AS Parameter7, dbo.ordini_di_produzione.note AS Note
     FROM            dbo.lotti INNER JOIN
                               dbo.distinta_ordini_di_produzione INNER JOIN
                               dbo.ordini_di_produzione ON dbo.distinta_ordini_di_produzione.ordine_di_produzione = dbo.ordini_di_produzione.id_ordine_di_produzione INNER JOIN
                               dbo.pannelli ON dbo.distinta_ordini_di_produzione.pannello = dbo.pannelli.id_pannello ON dbo.lotti.id_lotto = dbo.ordini_di_produzione.lotto INNER JOIN
                               dbo.pannelli_madre ON dbo.lotti.commessa = dbo.pannelli_madre.commessa AND dbo.pannelli.codice_pannello = dbo.pannelli_madre.CODPAS
     WHERE        (dbo.ordini_di_produzione.id_ordine_di_produzione = $id_ordine_di_produzione)) AS derivedtbl_1
GROUP BY OrderID, PartName, QuantityNested, QuantityCompleted, ExtraAllowed, Machine, AssemblyID, DueDate, DateWindow, Priority, ForcedPriority, NextPhase, Status, Material, Thickness, AutoTooling, ScriptTooling, ScriptName, 
    ManualNesting, Drawing, Turret, ProductionLabel, Note, Revision, BendingMode, BendingParameters, StaticNestID, Parameter0, Parameter1, Parameter2, Parameter3, Parameter4, Parameter5, Parameter6, Parameter7
ORDER BY AssemblyID";
    $result1=sqlsrv_query($conn,$query1);
    if($result1==TRUE)
    {
        while($row1=sqlsrv_fetch_array($result1))
        {
            $row=[];
            foreach ($intestazioni as $colonna)
            {
                if($colonna=="DueDate")
                    array_push($row,$row1[$colonna]->format('d/m/Y'));
                else
                    array_push($row,$row1[$colonna]);
            }
            array_push($data,$row);
        }

        $file = fopen("files/linea_carpenteria/test.txt", "w") or die("error");

        foreach ($data as $row)
        {
            $istruzione=implode("\t",$row);
            fwrite($file, $istruzione."\n");
        }
        
        fclose($file);
    }
    else
        die("error".$query1);

?>