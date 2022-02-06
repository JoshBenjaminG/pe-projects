<?php

include("style.php");

$array = [
	"count",
	"forms",
	"loops",
	"loops2",
	"madlib",
	"quotes",
	"retirementCalculator",
	"simpleMath",
	"rectangle",
];

foreach($array as $exercise) {

	echo "<li>

			<a href='$exercise.php' target='$exercise'>$exercise</a>

		</li>";
}

?>





