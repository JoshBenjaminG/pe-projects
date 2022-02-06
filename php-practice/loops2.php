<?php

include("style.php");

$array = [
	"hair" => "curly",
	"name" => "josh",
	"age" => "25",
	"occupation" => "student",
	"phrase" => "ayo",
];

$message = "<p>" . $array['name'] . " is " . $array['age'] . " and is a " . $array['occupation'] . " He has " . $array['hair'] . " hair, and likes to say " . $array['phrase'] . " </p>";

echo $message;



?>