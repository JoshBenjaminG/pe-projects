<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$error_message = "";
$message = false;

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $bodyMessage = $_POST['message'];

    if (!empty($name) && !empty($bodyMessage)) {
        try {
            // Instantiate PHPMailer
            $mail = new PHPMailer(true);

            // Set up SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';  // Gmail SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'joshuaegage@gmail.com';  // Your Gmail username
            $mail->Password = 'your_app_password';  // Your Gmail app password (if 2FA is enabled)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('joshuaegage@gmail.com', 'Joshua Gage');
            $mail->addAddress('joshuaegage@gmail.com');  // Send the email to yourself

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Personal site message';
            $mail->Body    = $name . " wrote:\n\n" . $bodyMessage . "\n\nThe email is: " . $email;

            // Send the email
            $mail->send();
            $message = "<div class='form-message'>Message sent successfully!</div>";
        } catch (Exception $e) {
            $message = "<div>Error sending email. Mailer Error: " . $mail->ErrorInfo . "</div>";
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
