<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Gestione Lotti";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/gestioneLotti.css" />
		<script src="js/gestioneLotti.js"></script>
		<link rel="stylesheet" href="css/inPageNavBar.css" />
		<link rel="stylesheet" href="libs/js/spinners/spinner.css" />
		<script src="libs/js/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="in-page-nav-bar">
			<div class="in-page-nav-bar-row"></div>
			<div class="in-page-nav-bar-row">
				<button class="in-page-nav-bar-button" onclick="getMascheraMessaInProduzione(this)">
					<span>Messa in produzione</span>
					<i class="fad fa-tasks"></i>
				</button>
				<!--<button class="in-page-nav-bar-button" onclick="getComposizioneLotti(this)">
					<span>Composizione lotti</span>
					<i class="fal fa-table"></i>
				</button>-->
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarGestioneLotti" style="display:none"></div>
		<div id="gestioneLottiContainer"></div>
		<div id="footer">
            <b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
        </div>
    </body>
    <script src="libs/js/multiple-select/multiple-select.min.js"></script>
	<script src="libs/js/multiple-select/multiple-select-it-IT.js"></script>
	<link rel="stylesheet" href="libs/js/multiple-select/multiple-select.min.css">
</html>