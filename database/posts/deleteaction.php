<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}


extract($_POST);

if (isset($idaction)) {
    if ($type == "Like") {
        $sql = "DELETE FROM action WHERE idpost = ? AND username = ?";
    } else if ($type == "Comment") {
        $sql = "DELETE FROM action WHERE idaction = ?";
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while deleting  an action. Please try again."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}

echo json_encode($arr);
