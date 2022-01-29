<?php

$age = 0;
$daysAlive = 0;

if( isset($_POST["submit"]) ) {
	if(isset($_POST["age"]) ) {
		$age = $_POST["age"];
		$daysAlive = $age * 365;
	}
}

?>

<p>How many days have you been alive?</p>

<p>You are <?=$age?> years old.</p>
<p>You have been alive for <?=$daysAlive?> days.</p>


<form method="POST">
	<label>What is your age?</label>
	<input type="number" name="age" min="0">
	
	<button type="submit" name="submit">submit</button>
</form>