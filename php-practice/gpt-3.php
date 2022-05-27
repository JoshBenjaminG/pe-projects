<?php 

    include("style.php");

    $lima = [
        "img" => "limabean.jpg",
        "name" => "lima",
        "food" => "beans",
        "age" => 4,
    ];

    $cody = [
        "img" => "codey.jpg",
        "name" => "cody",
        "food" => "cake",
        "age" => 7,
    ];

    $reads = [
        "img" => "miss-reads-a-lot.jpg",
        "name" => "reads",
        "food" => "pizza",
        "age" => 6,
    ];

    $monsters = [$lima, $cody, $reads];

    foreach($monsters as $monster) {
        echo "<monster-card>" .

                "<img src='" . $monster["img"] . "'></img>" .

                "<p>Hello, I'm " . $monster["name"] . "! </p>" .

                "<p>My favorite food is " . $monster["food"] . "! </p>" .

                "<p>I am " . $monster["age"] . " years old.</p>" .

            "</monster-card>";
    }

?>
