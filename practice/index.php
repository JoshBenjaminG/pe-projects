<!DOCTYPE html>
<html>
<head>
	<style>
		.thing {
			color: red;
		}
	</style>
</head>
<body>

<?php

		$firstName = "Josh";
		$lastName = "Gage";
		$fullName = $firstName . " " . $lastName;
		$occupation = "school";
		$hobby = "program";
		$funds = 10;
		$location = "work";

	if ($location == "home")	{
		echo "<p>I can go to the movies tonight!</p>";
	} else {
		echo "<p>Let's hang out some other time.</p>";
	}

?>

	<p>Hello, my name is <?=$fullName?>. I spend most of my time at <?=$occupation?>, and in my free time I like to <?=$hobby?>.</p>

</body>	
</html>