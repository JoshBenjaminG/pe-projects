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
	"magic",
	"form-practice",
];

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
</head>
<body>

<div class="inner-column">
	<ul>
		<?php foreach ($array as $exercise) { ?>
			<li>
				<a href="<?=$exercise?>.php"><?=$exercise?></a>
			</li>
		<?php } ?>

	</ul>
</div>
</body>
</html>




