<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($username) && isset($follow) && isset($type)) {
    if($type == "mute"){
        $sql = "UPDATE follow SET isMuted = 1 WHERE username = ? AND following = ?";
    } else if ($type = "unmute"){
        $sql = "UPDATE follow SET isMuted = 0 WHERE username = ? AND following = ?";
    }
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $follow);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "Fail to mute."];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to collect the POST parameters."];
}
echo json_encode($arr);
