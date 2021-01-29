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
		<script src="libs/js/handsontable/handsontable.full.min.js"></script>
		<link href="libs/js/handsontable/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="libs/js/handsontable/languages/it-IT.js"></script>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="in-page-nav-bar">
			<div class="in-page-nav-bar-row"></div>
			<div class="in-page-nav-bar-row">
				<button class="in-page-nav-bar-button" onclick="getMascheraNomiPannelliMadre(this)">
					<span>Nomi pannelli madre</span>
					<i class="fal fa-table"></i>
				</button>
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarGestioneAnagrafiche" style="display:none"></div>
		<div id="gestioneAnagraficheContainer"></div>
		<div id="footer">
			<b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
        </div>
	</body>
</html>