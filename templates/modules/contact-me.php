<?php 

$error_message = "";
$message = false;

if (isset($_POST['submit'])) {
    $to = "joshuaegage@gmail.com";
    $subject = "Personal site message";

    // Collect form data
    if (strlen($_POST['name']) > 0) {
        $name = $_POST['name'];
    }
    if (strlen($_POST['message']) > 0) {
        $message = $name . " wrote:" . "\n\n" . $_POST['message'] . "\n\n" . "The email is: " . $_POST['email'];
    }

    // Send email if message is valid
    if ($message) {
        $mail_sent = mail($to, $subject, $message);

        // Check if mail was sent successfully
        if ($mail_sent) {
            $message = "<div class='form-message'>Message sent successfully!</div>";
        } else {
            // Get the error code and message
            $error = error_get_last();
            if ($error) {
                $message = "<div>There was an error sending your message. Error: " . htmlspecialchars($error['message']) . "</div>";
            } else {
                $message = "<div>Unknown error occurred while sending the email.</div>";
            }
        }
    } else {
        $message = "<div>There was an error with your form submission.</div>";
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
