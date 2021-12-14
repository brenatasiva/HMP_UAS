<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($username)) {
    //Ambil data user
    $sql = "SELECT * FROM user WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    if ($result->num_rows > 0) {
        //Ambil semua post yang dibuat oleh user itu sendiri
        $posts = array();
        $sql = "SELECT * FROM post WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($posts, $r);
            }
            $data['posts'] = $posts;
        }

        //Ambil semua following user
        $following = array();
        $sql = "SELECT * FROM follow WHERE username=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($following, $r);
            }
            $data['following'] = $following;
        }

        //Ambil semua follower user
        $followers = array();
        $sql = "SELECT * FROM follow WHERE following = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($followers, $r);
            }
            $data['followers'] = $followers;
        }

        $arr = ["result" => "success", "data" => $data];
    } else {
        $arr = ["result" => "error", "message" => "There's an error in getting the user."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameter."];
}

echo json_encode($arr);
