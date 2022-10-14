<?php 

include("style.php");

$array = [
	"name" => "josh",
	"age" => "25",
	"hair" => "brown",
];

echo $array["name"];
echo "<br>";
echo $array["age"];
echo "<br>";
echo $array["hair"];
echo "<br>";

$sections = [
	"name" => "bob",
	"age" => "27",
	"hair" => "blue",
];

	echo "<br>";

foreach($sections as $section) {
	echo $section . "<br>";
}


$people = [
	"john" => [
		"age" => "21",
		"hair" => "blonde",		
	],
	"Susan" => [
		"age" => "23",
		"hair" => "black",		
	],
];

	echo "<br>";

foreach($people as $key => $value) {
	echo $key;
	echo "<br>";
	echo $value["age"];
	echo "<br>";
	echo $value["hair"];
	echo "<br>";
	echo "<br>";
}