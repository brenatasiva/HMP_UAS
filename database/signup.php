<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

$sql = "SELECT username FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $arr = ["result" => "error", "message" => "Username already exists. Please use another username."];
} else {
    $sql = "INSERT INTO user (username, nama, gender, password, tanggal_lahir, email, lokasi, bio) VALUES (?,?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssss", $username, $nama, $gender, $password, $tanggal_lahir, $email, $lokasi, $bio);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        if ($url != "") {
            $img = str_replace('data:image/jpeg;base64,', '', $url);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            if (file_put_contents("images/" . $username . ".jpg", $data)) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "sql error: $sql"];
            }
        } else {
            $arr = ["result" => "success"];
        }
    } else {
        $arr = ["result" => "error", "message" => "Fail to sign up your account. Please try again."];
    }
}

echo json_encode($arr);
