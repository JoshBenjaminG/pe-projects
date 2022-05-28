<form method="post">
    <label>Width:</label>
    <input type="text" name="width"><br>
    <label>Length:</label>
    <input type="text" name="length"><br>
    <input type="submit">
</form>

<?php
if(isset($_POST['width']) && isset($_POST['length'])){
    $width = $_POST['width'];
    $height = $_POST['length'];
    $area = $width * $height;
}

if ($area > 100) {
  echo '<h1>big</h1>';
} else {
  echo '<h1>small</h1>';
}
?>