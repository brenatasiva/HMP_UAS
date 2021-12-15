<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idcollection) && isset($nama_collection)) {
    //Insert collection
    $sql = "UPDATE collection set nama_collection = ? WHERE idcollection = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $nama_collection, $idcollection);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "Fail to edit collection."];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to collect the POST parameters."];
}
echo json_encode($arr);
