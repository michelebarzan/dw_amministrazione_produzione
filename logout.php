<?php
	$dw_produzione_params_file = fopen("C:\dw_produzione_params.json", "r") or die("error");
	$dw_produzione_params=json_decode(fread($dw_produzione_params_file,filesize("C:\dw_produzione_params.json")), true);
	fclose($dw_produzione_params_file);

	session_start();
	$_SESSION=array();
	session_destroy();
	$hour = time() + 3600 * 24 * 30;
	setcookie('username',"no", $hour);
	setcookie('password', "no", $hour);
	header("Location: ".$dw_produzione_params['web_server_info']['protocol']."://".$dw_produzione_params['web_server_info']['name'].":".$dw_produzione_params['web_server_info']['port']."/dw_produzione_login/login.html");
?>