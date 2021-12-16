<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($username)) {
    $data = [];
    //Ambil data user
    $sql = "SELECT * FROM user WHERE username LIKE %$username%";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows >= 0) {
        while ($r = mysqli_fetch_assoc($result)) {
            array_push($data, $r);
        }
        $arr = ["result" => "success", "data" => $data];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameter."];
}

echo json_encode($arr);
