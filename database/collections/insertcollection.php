<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($username) && isset($nama_collection)) {
    //Insert collection
    $sql = "INSERT INTO collection (username, nama_collection) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $nama_collection);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "Fail to insert collection."];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to collect the POST parameters."];
}
echo json_encode($arr);
