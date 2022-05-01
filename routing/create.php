
<?php

	
	$submitMessage = "";
	$titleError = "";
	$lectureTitle = "";
	$hasTitle = false;

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
	// if it has a length and title, make a confirmation message
	
		if ($hasTitle) {
			$submitMessage = "Lecture submitted";
			$newLecture = [
				"title" => $lectureTitle,
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

		<button type="submit" name="create">Add Lecture</button>
	</div>
		
</form>

<?php include('list.php'); ?>

