<?php 

function getDatabase() {
	$json = file_get_contents("data.json");
	if ($json) {
		return json_decode($json, true);
	} else {
		return [
			"movies" =>  [],
		];
	}
}

function createMovie($movie) {
	$data = getDatabase();
	$id = uniqid("a");
	$data["movies"][$id] = $movie;
	saveDatabase($data);
}

function saveDatabase($data) {
	$json = json_encode($data);
	file_put_contents('data.json', $json);
}

function getMovies() {
	$data = getDatabase();
	$movies = $data["movies"];
	return $movies;
}