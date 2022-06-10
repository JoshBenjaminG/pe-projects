<?php include('lecture-data.php'); ?>

<ul>
	<?php foreach ($lecture_data as $lecture) { ?>
		<li class='lecture'>
			<card>
				<h2><?=$lecture["title"]?></h2>
				<h3><?=$lecture["length"]?></h3>
				<a href= '?page=details&lecture=<?=$lecture["id"]?>'>details</a>
			</card>
		</li>
	<?php } ?>

</ul>

<?php
	$lectureJSON = file_get_contents('lectureJSON.json');
	$lectures = json_decode($lectureJSON, true);

	var_dump($lectures["lessons"]);
?>

{
	"name":"databaseName",
	"lastUpdated":"date",
	"lectures":{
		"asdfasdf": {
			"title":"Test Lecture",
			"length":"250:00",
			"description":"This is a test video"
		},
		"iuffguyg": {
			"id":"2",
			"title":"Test Lecture 2",
			"length":"240:00",
			"description":"This is a test video"
		}
	},
	"trash":[]
}

<a href= '?page=details&lecture=<?=$lecture["id"]?>'>details</a>

if ($hasLength && $hasTitle) {
			$submitMessage = "Lecture submitted";
			$newLecture = [
				"title" => $lectureTitle,
				"length" => $lectureLength,
				"description" => $lectureDescription,
			];


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