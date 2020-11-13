<?php
	$dw_produzione_params_file = fopen("C:\dw_produzione_params.json", "r") or die("error");
	echo fread($dw_produzione_params_file,filesize("C:\dw_produzione_params.json"));
	fclose($dw_produzione_params_file);
?>