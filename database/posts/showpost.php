<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "flutter_160419144", "ubaya", "flutter_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);
$data = [];

if (isset($username)) {
    //Ambil post dari yang user follow saja dan diurutkan berdasarkan tanggal upload post
    $sql = "SELECT p.* FROM post p INNER JOIN user u ON p.username = u.username INNER JOIN follow f ON f.username = p.username WHERE p.username = ? ORDER BY p.uploaded_at";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows >= 0) {
        while ($r = mysqli_fetch_assoc($result)) {
            array_push($data, $r);
        }
        $arr = ["result" => "success", "data" => $data];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while retrieving the posts."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameters."];
}

echo json_encode($arr);
