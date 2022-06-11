<?php


function getDatabase() {
		//check to see if the database exists
		$json = file_get_contents("comments.json");
		//if the file isn't empty 
		if($json) {
			//turn the contents into PHP
			return json_decode($json, true);
		}
		//else
		else {
			//create a structure 
			return [
				"name" => "databaseName",
				"lastUpdated" => date("l"),
				"comments" =>  [],
			];
		
		}
		//return the file
	} 

function getComments() {
		$data = getDatabase();
		$comments = $data["comments"];
		return $comments;
	}

function saveDatabase($data) {
	$json = json_encode($data);
	file_put_contents("comments.JSON", $json);
}

function createRecord($record) {
	$data = getDatabase();
	$id = uniqid("a");
	$data["comments"][$id] = $record;
	saveDatabase($data);
}

function deleteRecord($id) {
	$data = getDatabase();
	unset($data["comments"][$id]);
	saveDatabase($data);
}