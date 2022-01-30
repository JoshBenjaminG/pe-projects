<?php 

$name = 'Josh';
$age = 25;
$money = 1000;

echo "$name $age $money";

echo "<p>" . $name . " is " . $age . " and has " . $money . " dollars.</p>";

$array1 = [1, 2, 3, 4, 5];

$array2 = ['soccer', 'football', 'racing'];

$array3 = ['beans', 'tacos', 'guac', 'chicken'];

foreach ($array1 as $number) {
	echo $number;
}

foreach ($array2 as $sport) {
	echo $sport;
}

foreach ($array3 as $food) {
	echo $food;
}



?>

<p><?=$name?> is <?=$age?> and has <?=$money?> dollars.</p> 



