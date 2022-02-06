<?php 

include("style.php");

$year = date("Y"); 

if( isset($_POST["submit"]) ) {
	$age = $_POST["age"];
	$retireAge = $_POST["retireAge"];

	$ageDifference = $retireAge - $age;
	$ageYear = $year + $ageDifference;
}

?>

<section>
<h1>Retirement Calculator</h1>

<p><?=$ageDifference?> years until you retire.</p>
<p>It's <?=$year?>. So you can retire in <?=$ageYear?>.</p>

<form method="POST">
	<label>What is your current age?</label>
	<input type="number" name="age">

	<label>What age do you want to retire?</label>
	<input type="number" name="retireAge">
	
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