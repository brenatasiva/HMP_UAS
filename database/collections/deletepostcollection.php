<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idcollection) && isset($idpost)) {
    //Hapus post collection
    $sql = "DELETE FROM collection_post WHERE idcollection = ? AND idpost = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $idcollection, $idpost);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while deleting the post in the collection."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}

echo json_encode($arr);
