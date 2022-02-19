<?php

	if (isset($_POST["create"])) {
		echo "lecture created";
	}

?>


<form method="POST">
	<field>
		<label>Name</label>
		<input type="name" name="title" placeholder="Mathematics">
	</field>
	<field>
		<label>length (Minutes)</label>
		<input type="string" name="length" placeholder="1:00">
	</field>

	<button type="submit" name="create">Add Lecture</button>
</form>

