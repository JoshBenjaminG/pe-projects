<style type="text/css">
	.create-section * {
		padding: 10px;
	}
	.create {
		display: flex;
		flex-direction: column;
	}
	.create button {
		width: 100px;
	}
	.error {
		color: red;
	}
	.success {
		color: green;
	}
</style>

<?php 

include("functions.php");

$record = "";
$heading = $_POST['heading'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];

$message = "";
$submit = "";

if (isset($_POST['add'])) {
	if ($heading && $description) {
		$message = "Added";
		$submit = "success";
		$record = [
			"heading" => $heading,
			"description" => $description,
			"thumbnail" => $thumbnail,
		];
		createRecord($record);
	} else {
		$message = "Invalid";
		$submit = "error";
	}
}

?>

<section class="create-section">

<h1>The Create Page</h1>


<form method="POST" class="create">
	<field>

		<?php if (!$_POST['heading']) { ?>
			<p class="calm-voice error">Add Heading</p>
		<?php } ?>

		<label>Heading</label>
		<input type="string" name="heading" placeholder="A premium heading">
	</field>

	<field>

		<?php if (!$_POST['description']) { ?>
			<p class="calm-voice error">Add Description</p>
		<?php } ?>

		<label>Description</label>
		<input type="string" name="description" placeholder="A fantastic description">
	</field>

	<field>
		<label>Thumbnail</label>
		<input type="string" name="thumbnail" placeholder="https://i.imgur.com/b9gUeUb.jpg">
	</field>

	<button type="submit" name="add">Add</button>
</form>

<h1 class="loud-voice <?=$submit?>"><?=$message?></h1>

</section>