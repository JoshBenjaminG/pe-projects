
<?php
	// if something was submitted
	if (isset($_POST["create"])) {
		
	// is there a title	
		$lectureTitle = "";
		if(isset($_POST["title"])) {
			$lectureTitle = $_POST["title"];
	
			if (strlen($lectureTitle) > 0 ) {
				$hasTitle = true;
	// if there was not a title, make an error message
			} else {
				$titleError = "Please add a title";
			}
		}
	// is there a length
		$lectureLength = "";
		if(isset($_POST["length"])) {
			$lectureLength = $_POST["length"];
	// if there is not a length, make an error message
			if (strlen($lectureLength) > 0 ) {
				$hasLength = true;
			} else {
				$lengthError = "Please add a length";
			}
		}
	// if it has a length and title, make a confirmation message
		if ($hasLength && $hasTitle) {
			$submitMessage = "Lecture submitted";
		} 
	}

?>



<form method="POST">
	<div>
		<h1>Add a lecture or educational video below</h1>
		<p><?=$submitMessage?></p>
		<field>
			<label>Name</label>
			<input type="name" name="title" value="<?=$lectureTitle?>">
		</field>
			<p class="error"><?=$titleError?></p>
		<field>
			<label>length (Minutes)</label>
			<input type="string" name="length" value="<?=$lectureLength?>">
		</field>
			<p class="error"><?=$lengthError?></p>

		<button type="submit" name="create">Add Lecture</button>
	</div>
		
</form>

