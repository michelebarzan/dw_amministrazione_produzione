<?php
	$dw_produzione_params_file = fopen("C:\dw_produzione_params.json", "r") or die("error");
	$dw_produzione_params=json_decode(fread($dw_produzione_params_file,filesize("C:\dw_produzione_params.json")), true);
	fclose($dw_produzione_params_file);

	$connectionInfo=array("Database"=>$database, "UID"=>$dw_produzione_params['sql_server_info']['username'], "PWD"=>$dw_produzione_params['sql_server_info']['password']);
	$conn = sqlsrv_connect($dw_produzione_params['sql_server_info']['ip'],$connectionInfo);
	if(!$conn)
		die("error");
?>