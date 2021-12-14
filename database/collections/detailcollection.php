<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idcollection)) {
    //Ambil post yang ada di dalam collectionnya
    $data = [];
    $sql = "SELECT * FROM collection_post WHERE idcollection = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idcollection);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        while ($r = mysqli_fetch_assoc($result)) {
            array_push($data, $r);
        }
        $arr = ["result" => "success", "data" => $data];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while getting the post in the collection."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}


echo json_encode($arr);
