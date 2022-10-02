<?php 

include("functions.php");

$thisArticle = "";
$id = $_GET['id'];
$delete = $_POST['delete'];
$edit = $_POST['edit'];

$record = "";
$heading = $_POST['heading'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];

foreach (getArticles() as $key => $value) {
	if ($id == $key) {
		$thisArticle = $value;
	}
}

if (isset($delete)) {
	deleteRecord($key);
	echo "This article has been deleted.";
}

if (isset($edit)) {
	$record = [
		"heading" => $heading,
		"description" => $description,
		"thumbnail" => $thumbnail,
	];
	editRecord($key , $record);
	echo "This article has been edited.";
}

?>

<section>
	<inner-column>
		
		<h1 class="loud-voice"><?=$thisArticle["heading"]?></h1>
		<p class="loud-voice"><?=$thisArticle["description"]?></p>
		<picture>
			<img src='<?=$thisArticle["thumbnail"]?>' alt='$todo'>
		</picture>

	</inner-column>
</section>

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

	<button type="submit" name="edit">edit</button>
	<button type="submit" name="delete">delete article</button>
</form>