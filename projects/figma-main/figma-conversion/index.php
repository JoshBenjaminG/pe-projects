<?php 

include('functions/routing.php'); 
	
if(isset($_GET['page'])) {
	$page = $_GET['page'];
} else {
	$page = 'page-1';
}

$modules = getData("data/$page.json");

include('components/head.php');

foreach($modules as $module) {
	include("components/$module[module].php");
}
