<?php

$array = [
	"count",
	"forms",
	"loops",
	"loops2",
	"madlib",
	"quotes",
	"retirementCalculator",
	"simpleMath",
];

foreach($array as $exercise) {

	echo "<li>

			<a href='$exercise.php' target='$exercise'>$exercise</a>

		</li>";
}

?>





