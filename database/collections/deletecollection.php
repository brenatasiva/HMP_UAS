<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idcollection) && isset($idpost)) {
    //Delete collection_post yang memiliki idcollection sama
    $sql = "DELETE FROM collection_post WHERE idcollection = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idcollection);
    $stmt->execute();
    if ($stmt->affected_rows >= 0) {
        //Delete collectionnya
        $sql = "DELETE FROM collection WHERE idcollection = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idcollection);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $arr = ["result" => "success"];
        } else {
            $arr = ["result" => "error", "message" => "There's an error while deleting the collection."];
        } 
    } else {
        $arr = ["result" => "error", "message" => "There's an error while deleting the post in the collection."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}

echo json_encode($arr);
