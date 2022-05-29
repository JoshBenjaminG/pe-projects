<?php 

include("style.php");

function createMonster($name, $age, $food, $image) {
    $monster = [
        "name" => $name,
        "age" => $age,
        "food" => $food,
        "image" => $image,
    ];
    return $monster;
}

$lima = createMonster("Lima", 5, "beans", "limabean.jpg");
$codey = createMonster("codey", 7, "cake", "codey.jpg");
$reads = createMonster("reads", 6, "burgers", "miss-reads-a-lot.jpg");
$crunchy = createMonster("crunchy", 5, "pizza", "fragoo.jpg");
$chunky = createMonster("chunky", 7, "milk", "shadow.jpg");

$monsters = [$lima, $codey, $reads, $crunchy, $chunky];

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
</head>
<body>

<ul>
    <?php foreach($monsters as $monster) { ?>
        <li>
            <h3><?=$monster["name"]?></h3>
            <img src='<?=$monster["image"]?>'>
            <p><?=$monster["image"]?></p>
            <p><?=$monster["age"]?></p>
            <p><?=$monster["food"]?></p>
        </li>
    <?php } ?>
</ul>

</body>
</html>