<?php 



function get_language_code($string, $pointer1, $pointer2) {
  $start = strpos($string, $pointer1) + 1;
  $length = strpos($string, $pointer2) - $start;
  return substr($string, $start, $length);
}

function createOutputFile($property) {

	$dir = scandir("lifechurch");
	$languages = [];
	$default = null;

	foreach ($dir as $value) {
		if (str_contains($value, ".json")) {
			$key = get_language_code($value, "-", ".");
			$data = json_decode(file_get_contents("lifechurch/" . $value), true);
			$language = [
				"key" => $key,
				"content" => $data["banner_". $property],
			];

			if ( str_contains($value, "input-en") ) {
				$default = $language;
			} else {
				array_push($languages, $language);
			}	
		}
	
		array_unshift($languages, $default);

		$newLine = "\r\n";

		$output = "";

		for ($i = 0; $i < count($languages); $i++) {
			$key = $languages[$i]["key"];
			if ($i == 0) {
				$output .= "{% if \${language} == '" . $key . "' %}" . $newLine;
			} else {
				$output .= "{% elsif \${language} == '" . $key . "' %}" . $newLine;
			}
			$output .= $languages[$i]["content"] . $newLine;
		}
		$output .= "{%" . "else %}" . $newLine;
		$output .= $default["content"] . $newLine;
		$output .= "{%" . "endif %}";

		file_put_contents("my-output-$property.html", $output);
	}


}

	createOutputFile("title");
	createOutputFile("message");



















// sort($newArr);
// $contents = implode(',', $newArr);
// file_put_contents('file.txt', $contents, FILE_APPEND);