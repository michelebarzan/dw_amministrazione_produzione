<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Gestione Anagrafiche";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/gestioneAnagrafiche.css" />
		<script src="js/gestioneAnagrafiche.js"></script>
		<link rel="stylesheet" href="css/inPageNavBar.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="in-page-nav-bar">
			<div class="in-page-nav-bar-row"></div>
			<div class="in-page-nav-bar-row">
				<button class="in-page-nav-bar-button" onclick="">
					<span>Bottone</span>
					<i class="fad fa-calculator-alt"></i>
				</button>
				<button class="in-page-nav-bar-button" onclick="getImportazioneMateriali(this)">
					<span>Importazione/Inserimento Materiali</span>
					<i class="fad fa-upload"></i>
				</button>
				<button class="in-page-nav-bar-button" onclick="getMascheraRichiesteMateriali(this)">
					<span>Richieste Materiali</span>
					<i class="fad fa-receipt"></i>
				</button>
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarGestioneAnagrafiche" style="display:none">
            <button class="rcb-button-text-icon" id="buttonImportaExcel" onclick="getPopupInserimentoManuale(this)">
                <span>Inserimento Manuale</span>
                <i class="fad fa-layer-plus" style="margin-left:5px"></i>
            </button>
		</div>
		<div id="gestioneAnagraficheContainer"></div>
		<div id="footer">
			<b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
        </div>
	</body>
</html>