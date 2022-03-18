<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<?php

	// $myArray = ["one", 1, "cat", "dog", "item", "second", "minute"];

	$reads = [
		"id" => "1",
		"name" => "Reads",
		"favoriteFood" => "chicken",
		"age" => 4,
		"adopted" => false,
		"portrait" => "portraits/miss-reads-a-lot.jpg",
	];

	$lima = [
		"id" => "2",
		"name" => "Lima",
		"favoriteFood" => "fruit",
		"age" => 6,
		"adopted" => true,
		"portrait" => "portraits/limabean.jpg",
	];

	$cody = [
		"id" => "3",
		"name" => "Cody",
		"favoriteFood" => "pasta",
		"age" => 8,
		"adopted" => false,
		"portrait" => "portraits/codey.jpg",
	];

	$monsters = [$reads, $lima, $cody];

	

	foreach ($monsters as $monster) {
		$name = $monster["name"];
		$story = "Hello! I am " . $monster["age"] . " years old. My favorite food is " . $monster["favoriteFood"] . ".";
		$portrait = $monster["portrait"];
		$status = $monster["adopted"];

		if ($status == true) {
			$status = "I have been adopted";
		} else {
			$status = "I am up for adoption";
		}

		echo
		"<section>" . 
			 "<div class='inner-column'>";

				echo 
				"<div class='" . $name . "'>" .
				 	"<monster-info>" .
						 "<h1>" . $name . "</h1>" .
						 "<img src='" . $portrait . "'width='300'>" .
						 "<p>" . $story . "</p>" .
						 "<p>" . $status . "</p>" .
				 	"</monster-info>".
				"</div>";
			echo 
			 "</div>" .
		 "</section>";

	}

?>



	

</body>	
</html>