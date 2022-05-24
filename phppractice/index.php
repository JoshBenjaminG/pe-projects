<?php 

$concatenation = "concatenation";
$step1 = "initialize variables.";
$step2 = "variables";
$variable = "Hello!";
$html = "HTML";
$tedTalk = "Ted Talk";


Echo "<p>This is a quick example of " . $concatenation . " inside of the <?php?> tag."

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<div class="inner-column">

<h1>Today, we are practicing with <mark><?=$concatenation?>.</mark></h1>

<p>PHP templates are easy, first, you have to <mark><?=$step1?></mark>. Next, you need to display the values by typing the <mark><?=$step2?></mark>. All variables have values. for example, the value of the variable "$variable" is <mark><?=$variable?>.</mark></p>

<p>Why is this useful? It's useful because instead of having to write out all of the <mark><?=$html?></mark>, you could just use variables! This will be especially useful if you store the variables somewhere else.</p>

<p>This has been my concatenation example! Thanks for coming to my <mark><?=$tedTalk?>.</mark></p>

</div>

</body>
</html>