<?php 

$feedback = "";

if (isset($_POST['submit'])) {
    $to = "joshuaegage@gmail.com";
    $subject = "Personal site message";

    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $userMessage = isset($_POST['message']) ? trim($_POST['message']) : '';

    if ($name && $email && $userMessage) {
        $mailBody = "$name wrote:\n\n$userMessage\n\nThe email is: $email";

        if (mail($to, $subject, $mailBody)) {
            $feedback = "<div class='form-message'>Message sent successfully!</div>";
        } else {
            $feedback = "<div class='form-message error'>Message failed to send.</div>";
        }
    } else {
        $feedback = "<div class='form-message error'>Please fill in all fields.</div>";
    }
}
?>

<section class='contact-me'>
    <inner-column>
        <contact-me>
            <h2 class="loud-voice">Let's talk!</h2>
            <p>Interested in working with me? Let's get in touch.</p>

            <?=$feedback?>

            <form action="" method="post">
                <input type="text" name="name" placeholder="Name" required><br>
                <input type="email" name="email" placeholder="Enter your email..." required><br>
                <textarea rows="5" name="message" cols="30" placeholder="Enter Message..." required></textarea><br>
                <input type="submit" name="submit" value="Submit" class="form-input">
            </form>
        </contact-me>
    </inner-column>
</section>
