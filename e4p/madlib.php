<?php

include("style.php");

$noun = "dog";
$verb = "walk";
$adjective = "blue";
$adverb = "quickly";

if( isset($_POST["submit"]) ) {
	if ( empty($_POST["noun"]) ) {
		$noun = "";
	} else {
		$noun = $_POST["noun"];
	}

	if ( empty($_POST["verb"]) ) {
		$verb = "";
	} else {
		$verb = $_POST["verb"];
	} 

	if ( empty($_POST["adjective"]) ) {
		$adjective = "";
	} else {
		$adjective = $_POST["adjective"];
	} 

	if ( empty($_POST["adverb"]) ) {
		$adverb = "";
	} else {
		$adverb = $_POST["adverb"];
	}  
	if (isset($_POST["noun"]) && $_POST["verb"] && $_POST["adjective"] && $_POST["adverb"]) {
		$message = "Do you " . $verb . " your " . $adjective . " " . $noun . " " . $adverb . "?" . " That's hilarious!";
	} else {
		$message = "Enter the dang words.";
	}
}



?>


<section>
<h1>Mad libs! Enter strings into the input fields.</h1>

<p><?=$message?></p>

<form method="POST">

	<label>Enter a noun.</label>
	<input type="string" name="noun" value="<?=$noun?>" placeholder="Person, place, or thing.">

	<label>Enter a verb.</label>
	<input type="string" name="verb" value="<?=$verb?>" placeholder="An action.">

	<label>Enter an adjective.</label>
	<input type="string" name="adjective" value="<?=$adjective?>" placeholder="Word that describes a noun">

	<label>Enter an adverb.</label>
	<input type="string" name="adverb" value="<?=$adverb?>" placeholder="Word that describes an action.">

	<button type="submit" name="submit">submit</button>
</form>
</section>

