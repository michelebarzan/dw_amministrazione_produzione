<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Homepage";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div id="container">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div class="homepageLinkContainer">
					<div class="homepageLink" data-tooltip="Homepage" onclick="gotopath('index.php')">
						<i class="fad fa-home"></i>
						<div>Homepage</div>
					</div>
					<div class="homepageLink" data-tooltip="Compila e gestisci le anagrafiche presenti nel database" onclick="gotopath('gestioneAnagrafiche.php')">
						<i class="fad fa-database"></i>
						<div>Gestione Anagrafiche</div>
					</div>
					<div class="homepageLink" data-tooltip="Compila e gestisci le anagrafiche presenti nel database" onclick="gotopath('gestioneUtenti.php')">
						<i class="fad fa-user-cog"></i>
						<div>Gestione Utenti</div>
					</div>
					<div class="homepageLink" data-tooltip="Gestisci i percorsi dei pannelli in produzione" onclick="gotopath('gestionePercorsi.php')">
						<i class="fad fa-network-wired"></i>
						<div>Gestione Percorsi</div>
					</div>
					<div class="homepageLink" data-tooltip="Gestisci la messa in produzione dei lotti" onclick="gotopath('gestioneLotti.php')">
						<i class="fad fa-clipboard-list-check"></i>
						<div>Gestione Lotti</div>
					</div>
				</div>
				<div id="statisticheSwContainer"></div>
			</div>
		</div>
		<div id="footer">
			<b>De&nbspWave&nbspS.r.l.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspDe&nbspMarini&nbsp116149&nbspGenova&nbspItaly&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp010&nbsp640201|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
		</div>
	</body>
</html>