<?php
	session_start();
	if(!isset($_SESSION['username']))
	{
		header("Location: http://".$_SERVER['SERVER_ADDR']."/dw_produzione_login/login.html");
	}
?>