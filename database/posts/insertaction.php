<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}


extract($_POST);

if (isset($idpost) && isset($username)) {
    //Masukkan action
    $sql = "INSERT INTO action (action, action_at, comment, idpost, username) VALUES (?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssis", $action, $date, $comment, $idpost, $username);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while adding an action. Please try again."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}


echo json_encode($arr);
