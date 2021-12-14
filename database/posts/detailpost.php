<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}


extract($_POST);

if (isset($idpost)) {
    $data = [];
    $sql = "SELECT * FROM post WHERE idpost=$idpost";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = mysqli_fetch_assoc($result);

        //Ambil list komentar yang ada dalam post tersebut
        $comments = array();
        $sql = "SELECT * FROM action WHERE action = 'Comment'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($comments, $r);
            }
            $data['comments'] = $comments;
        }
        
        //Ambil list likes yang ada dalam post tersebut
        $likes = array();
        $sql = "SELECT * FROM action WHERE action = 'Like'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($likes, $r);
            }
            $data['likes'] = $likes;
        }

        $arr = ["result" => "success", "data" => $data];
    } else {
        $arr = ["result" => "error", "message" => "There's an error while retrieving the post. Please try again."];
    }
} else {
}


echo json_encode($arr);
