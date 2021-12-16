<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idpost)) {
    $sql = "SELECT caption FROM post WHERE idpost = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idpost);
    $stmt->execute();
    $res = $stmt->get_result();

    while ($row = mysqli_fetch_assoc($res)) {
        $arr = ['result' => 'success', 'data'  => $row['caption']];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to get the post's ID."];
}

echo json_encode($arr);
