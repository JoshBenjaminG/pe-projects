<?php
$error_message = "";
$message = false;

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $bodyMessage = $_POST['message'];

    if (!empty($name) && !empty($bodyMessage)) {
        // Set up email parameters
        $to = 'joshuaegage@gmail.com';
        $subject = 'Personal site message';
        $messageBody = $name . " wrote:\n\n" . $bodyMessage . "\n\nThe email is: " . $email;
        $headers = 'From: ' . $email . "\r\n" .
                   'Reply-To: ' . $email . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        // Send email
        if (mail($to, $subject, $messageBody, $headers)) {
            $message = "<div class='form-message'>Message sent successfully!</div>";
        } else {
            $message = "<div>Error sending email.</div>";
        }
    } else {
        $message = "<div>Please fill out all fields.</div>";
    }
}
?>

<section class='contact-me'>
    <inner-column>
        <contact-me>
            <h2 class="loud-voice">Let's talk!</h2>
            <p>Interested in working with me? Let's get in touch.</p>

            <?=$message?>

            <form action="" method="post">
                <input type="text" name="name" placeholder="Name"><br>
                <input type="text" name="email" placeholder="Enter your email..."><br>
                <textarea rows="5" name="message" cols="30" placeholder="Enter Message..."></textarea><br>
                <input type="submit" name="submit" value="Submit" class="form-input">
            </form>
        </contact-me>
    </inner-column>
</section>
