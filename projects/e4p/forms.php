<?php

include("style.php");

$age = 10;

if( isset($_POST["submit"]) ) {
	if(isset($_POST["age"]) ) {
		$age = $_POST["age"];
	}
}

$daysAlive = $age * 365;

?>

<h1>How many days have you been alive?</h1>
<h2>Enter your age below:</h2>

<form method="POST">
	<label>What is your age?</label>
	<input type="number" name="age" min="0" value="<?=$age?>">
	
	<button type="submit" name="submit">submit</button>
</form>

<p>You are <?=$age?> years old.</p>
<p>You have been alive for <?=$daysAlive?> days.</p>

