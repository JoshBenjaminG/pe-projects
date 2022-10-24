<?php 

function getData($filePath) {
	$json = file_get_contents($filePath);

	if ($json) {
		return json_decode($json, true);
	}
	else {
		return "error: could not find data";
	}
}

