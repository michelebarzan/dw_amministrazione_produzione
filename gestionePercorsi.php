<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Gestione Percorsi";

	if(isset($_GET["btnToClick"]))
		echo '<input type="hidden" id="btnToClick" value="'.$_GET["btnToClick"].'">';
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/gestionePercorsi.css" />
		<script src="js/gestionePercorsi.js"></script>
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
				<button class="in-page-nav-bar-button" id="btnAnagraficaStazioni" onclick="getAnagraficaStazioni(this)">
					<span>Anagrafica Stazioni</span>
					<i class="fad fa-database"></i>
				</button>
				<button class="in-page-nav-bar-button" id="btnAnagraficaPercorsi" onclick="getAnagraficaPercorsi(this)">
					<span>Anagrafica Percorsi</span>
					<i class="fad fa-database"></i>
				</button>
				<button class="in-page-nav-bar-button" id="btnAnagraficaFiltri" onclick="getAnagraficaFiltri(this)">
					<span>Anagrafica Filtri</span>
					<i class="fad fa-database"></i>
				</button>
				<button class="in-page-nav-bar-button" id="btnComposizioneFiltri" onclick="getMascheraComposizioneFiltri(this)">
					<span>Composizione Filtri</span>
					<i class="fad fa-filter"></i>
				</button>
				<button class="in-page-nav-bar-button" id="btnComposizionePercorsi" onclick="getMascheraComposizionePercorsi(this)">
					<span>Composizione Percorsi</span>
					<i class="fad fa-network-wired"></i>
				</button>
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarGestionePercorsi" style="display:none"></div>
		<div id="gestionePercorsiContainer"></div>
		<div id="footer">
            <b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
        </div>
	</body>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
</html>