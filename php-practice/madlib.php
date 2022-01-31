<?php

$age = 0;
$daysAlive = 0;

if( isset($_POST["submit"]) ) {
	if (isset($_POST["noun"]) ) {
		$noun = $_POST["noun"];
		$verb = $_POST["verb"];
		$adjective = $_POST["adjective"];
		$adverb = $_POST["adverb"];

		$message = "Do you " . $verb . " your " . $adjective . " " . $noun . " " . $adverb . "?" . " That's hilarious!";
	}
}

?>


<section>
<p>Mad libs! Enter strings into the input fields.</p>

<p><?=$message?></p>

<form method="POST">
	<label>Enter a noun.</label>
	<input type="string" name="noun" placeholder="dog">
	<label>Enter a verb.</label>
	<input type="string" name="verb" placeholder="walk">
	<label>Enter an adjective.</label>
	<input type="string" name="adjective" placeholder="blue">
	<label>Enter an adverb.</label>
	<input type="string" name="adverb" placeholder="quickly">
	<button type="submit" name="submit">submit</button>
</form>
</section>

<style type="text/css">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		padding-bottom: 10px;
		padding-top: 10px;
	}

	button {
		margin-top: 10px;
	}
</style>