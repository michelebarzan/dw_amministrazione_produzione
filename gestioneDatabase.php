<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Gestione Database";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/gestioneDatabase.css" />
		<script src="js/gestioneDatabase.js"></script>
		<link rel="stylesheet" href="libs/js/spinners/spinner.css" />
		<script src="libs/js/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	</head>
	<body onresize="fixTable()">
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="gestioneDatabaseActionBar">
			<!--<button class="rcb-button-text-icon" id="bntImportaDatabaseSql" onclick="getPopupImportaDatabase(this)"><span>Importa database sql</span><i style="margin-left:10px" class="fad fa-database"></i></button>-->
			<button class="rcb-button-text-icon" id="bntImportaDatabaseSql" onclick="importaDatabase()"><span>Importa database sql</span><i style="margin-left:10px" class="fad fa-database"></i></button>
			<button class="rcb-button-text-icon" id="bntImportaDatabaseSql" onclick="getPopupSvuotaDatabaseSql(this)"><span>Svuota database sql</span><i style="margin-left:10px" class="fad fa-eraser"></i></button>
			<!--<button class="rcb-button-text-icon" id="bntAggiornaAnagrafiche" onclick="getPopupAggiornaAnagrafiche(this)"><span>Aggiorna anagrafiche</span><i style="margin-left:10px" class="fad fa-edit"></i></button>
			<button class="rcb-button-text-icon" id="bntSvuotaDistinte" onclick="getPopupSvuotaDistinte(this)"><span>Svuota distinte</span><i style="margin-left:10px" class="fad fa-eraser"></i></button>-->
			<button class="rcb-button-text-icon" id="bntMateriePrime" onclick="getTabellaMateriePrime(this)"><span>Materie prime</span><i style="margin-left:10px" class="fal fa-table"></i></button>
			<button class="rcb-button-text-icon" id="bntLogImportazioni" onclick="getElencoLogImportazioni()"><span>Log importazioni</span><i style="margin-left:10px" class="fad fa-history"></i></button>
			<div id="rowsNumEditableTable" style="display:none"></div>
		</div>
		<div id="gestioneDatabaseContainer"></div>
		<div id="footer">
            <b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
		</div>
	</body>
</html>