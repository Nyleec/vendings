<?php

ini_set("SMTP", "smtp-relay.gmail.com");
ini_set("smtp_port", "587");
ini_set("sendmail_from", "info@crunchnmunch.com");


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Email to the company
    $to = "info@crunchnmunch.com";
    $subject = "New Message from Website";
    $body = "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Message: " . $message . "\n";
    $body = wordwrap($body, 70, "\r\n");
    $headers = "From: " . $email;

    // Send email to the company
    if (mail($to, $subject, $body, $headers)) {
        // Auto-reply to the user
        $replySubject = "Thank you for contacting us";
        $replyMessage = "Dear " . $name . ",\n\n";
        $replyMessage .= "Thank you for contacting us. We have received your message and will get back to you shortly.\n\n";
        $replyMessage .= "Best regards,\n";
        $replyMessage .= "The Crunch-N-Munch Team";
        $replyHeaders = "From: info@crunchnmunch.org";

        // Send auto-reply email to the user
        mail($email, $replySubject, $replyMessage, $replyHeaders);

        // Redirect back to the About page
        header("Location: about.html");
        exit;
    } else {
        echo "Failed to send email";
    }
}
?>
