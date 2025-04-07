<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = htmlspecialchars(trim($_POST["firstname"]));
    $familyname = htmlspecialchars(trim($_POST["familyname"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));
    $readings = htmlspecialchars(trim($_POST["readings"]));
  	$dateofbirth = htmlspecialchars(trim($_POST["dateofbirth"]));
    $timeofbirth = htmlspecialchars(trim($_POST["timeofbirth"]));
    $cityofbirth = htmlspecialchars(trim($_POST["cityofbirth"]));

    if (empty($email)) {
        $response["status"] = "error";
        $response["message"] ="Email is required. Please provide a valid email address.";
        echo json_encode($response);
        exit;
    }

    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["status"] = "error";
        $response["message"] = "Invalid email format.";
        echo json_encode($response);
        exit;
    }

    $to = "manuela@placeofstillness.org";
    $subject = "New booking request";

    $body = "Name: $firstname $familyname\n" .
            "Email: $email\n\n" .
            "Message:\n$message\n\n" .
            "Reading: $readings\n" .
      		"Date of birth: $dateofbirth\n" .
     		"Time of birth: $timeofbirth\n" .
      		"City of birth: $cityofbirth\n";

    if (mail($to, $subject, $body)) {
        $response["status"] = "success";
        $response["message"] = "Thank you! You'll hear from me within 48 hours.";
    } else {
        $response["status"] = "error";
        $response["message"] = "Oops, something didn't quite work.";
    }

    echo json_encode($response);
} else {
    $response["status"] = "error";
    $response["message"] = "Invalid request.";
    echo json_encode($response);
}
?>