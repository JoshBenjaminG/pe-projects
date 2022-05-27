<?php

include("style.php");

$array = [
	"count",
	"forms",
	"madlib",
	"quotes",
	"retirementCalculator",
	"simpleMath",
	"rectangle",
	"triangle",
	"hello",
	"pizza",
	"gpt-3",
];

foreach($array as $exercise) {

	echo "<li>

			<a href='$exercise.php' target='$exercise'>$exercise</a>

		</li>";
}

?>





