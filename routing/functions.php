<?php //create record
	//get the database
	function getDatabase() {
		//check to see if the database exists
		$json = file_get_contents("lectureJSON.json");
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
				"lectures" =>  [],
			];
		
		}
		//return the file
	} 

	//save record
	function saveDatabase($data) {
		$json = json_encode($data);
		file_put_contents('lectureJSON.json', $json);
	}

	function createRecord($record) {
		$data = getDatabase();
		$id = uniqid("a");
		$data["lectures"][$id] = $record;
		saveDatabase($data);
	}


	function getLectures() {
		$data = getDatabase();
		$lectures = $data["lectures"];
		return $lectures;
	}

	//get the record
	function getRecordById($id) {
		$data = getDatabase();
		//look for the record that has the id
		foreach ($data["lectures"] as $key => $value) {
			if($key == $id) {
				return $value;
			}
		}
		//if it does
			//return it
		//else
			//say it can't be found
	}
	//delete record 
	function deleteRecord($id) {
		$data = getDatabase();
		unset($data["lectures"][$id]);
		saveDatabase($data);
		//function getRecordById($id) {
		//if there is a record with the id
			//delete it
		//else 
			//say you couldn't find it
		//return the thing you deleted - and say you deleted it
	}

	//update record
	function updateRecord($id) {
		//function getRecordById($id) {
		//if there is a record with the id
			//put the new data there
		//else 
			//say you couldn't find it
	}

	


