<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>

<?php

// Define an array of card data, each element of which contains an image URL,
// text, and link for a single card
$cards = array(
  array(
    'image' => 'https://i.imgur.com/b9gUeUb.jpg',
    'text' => 'Test content Test content Test content Test content Test content Test content',
    'link' => 'https://example.com/card1',
  ),
  array(
    'image' => 'https://i.imgur.com/b9gUeUb.jpg',
    'text' => 'Test content Test content Test content Test content Test content Test content Test content Test content Test content Test content Test content Test content',
    'link' => 'https://example.com/card2',
  ),
  array(
    'image' => 'https://i.imgur.com/b9gUeUb.jpg',
    'text' => 'Test content Test content Test content Test content Test content Test content Test content Test content Test content Test content Test content Test contentTest content Test content Test content Test content Test content Test content',
    'link' => 'https://example.com/card3',
  ),
);

// Start a div wrapper
echo '<div class="card-wrapper">';

// Loop through the cards array, generating the HTML for each card
foreach ($cards as $card) {
  // Use the data from the current card to generate the HTML
  echo '<div class="card">';
  echo ' <picture> <img src="' . $card['image'] . '" alt="' . $card['text'] . '"> </picture>';

  // Start a div wrapper for the card-text
  echo '  <div class="card-text-wrapper">';
  echo '    <div class="card-text">' . $card['text'] . '</div>';
  // Close the div wrapper
  echo '  </div>';

  // Add the link as a direct child of the .card div
  echo '  <a href="' . $card['link'] . '">Link</a>';

  echo '</div>';
}

// Close the div wrapper
echo '</div>';

?>
	
</body>
</html>