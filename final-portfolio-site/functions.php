<?php 

	function getResourceData($resource) {
		$json = file_get_contents("data/$resource.json");
		return json_decode($json, true);
	}

	function getResourceBySlug($resource, $slug) {
		$resources = getResourceData($resource);
		foreach ($resources as $resource) {
			if ($resource["slug"] == $slug) {
				return $resource;
			}
		}
	}