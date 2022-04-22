
<?php

	
	$lengthError = "";
	$lectureLength = "";
	$hasLength = false;
	$submitMessage = "";
	$titleError = "";
	$lectureTitle = "";
	$hasTitle = false;
	$lectureDescription = '';
	$descriptionError = '';	
	$hasDescription = false;

	// if something was submitted
	if (isset($_POST["create"])) {
		
	// is there a title	
		
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
		
		if(isset($_POST["length"])) {
			$lectureLength = $_POST["length"];
			if(strlen($lectureLength) > 0 ) {
				$hasLength = true;
	// if there is not a length, make an error message
			} else {
				$lengthError = "Please add a length";
			}
		}

		if(isset($_POST["description"])) {
			$lectureDescription = $_POST["description"];
			if(strlen($lectureDescription) > 0 ) {
				$hasDescription = true;
	// if there is not a length, make an error message
			} else {
				$descriptionError = "Please add a description";
			}
		}

	// if it has a length and title, make a confirmation message
	
		if ($hasLength && $hasTitle) {
			$submitMessage = "Lecture submitted";
			$newLecture = [
				"name" => "databaseName",
				"lastUpdated" => date("l"),
				"lectures" =>  [
					"1"=> [
						"title"=> $lectureTitle,
						"length"=> $lectureLength,
						"description"=> $lectureDescription,
					],
				]
			];

			createRecord($newLecture);
		}
	}

?>



<form method="POST">
	<div>
		<h1>Add a lecture or educational video below</h1>
		<p class="success"><?=$submitMessage?></p>
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
		<field>
			<label>Description</label>
			<input type="string" name="description" value="<?=$lectureDescription?>">
		</field>
			<p class="error"><?=$descriptionError?></p>

		<button type="submit" name="create">Add Lecture</button>
	</div>
		
</form>

