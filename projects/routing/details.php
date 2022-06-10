
<?php include("lecture-data.php"); ?>

<?php if(isset($_GET['lecture'])) {
	$this_lecture_id = $_GET['lecture'];
}

foreach ($lecture_data as $lecture) {
	if($this_lecture_id == $lecture['id']) {
		$this_lecture = $lecture;
	}
} ?>

<h1><?=$this_lecture['title']?></h1>

	<picture>
		<img src="https://peprojects.dev/images/portrait.jpg">
	</picture>

<p><?=$this_lecture['description']?></p>
