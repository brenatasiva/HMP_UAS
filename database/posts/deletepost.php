<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($idpost)) {
    @unlink("images/" . $idpost . ".jpg");
    //Delete action
    $sql = "DELETE FROM action WHERE idpost = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idpost);
    $stmt->execute();
    if ($stmt->affected_rows >= 0) {
        //Delete collection
        $sql = "DELETE FROM collection_post WHERE idpost = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idpost);
        $stmt->execute();
        if ($stmt->affected_rows >= 0) {
            //Delete post
            $sql = "DELETE FROM post WHERE idpost = ?";
            $stmt = $conn->prepare($sql);
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $idpost);
            $stmt->execute();
            if ($stmt->affected_rows >= 0) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "Fail to delete the post."];
            }
        } else {
            $arr = ["result" => "error", "message" => "Fail to delete the post in the collections."];
        }
    } else {
        $arr = ["result" => "error", "message" => "Fail to delete the post in the actions."];
    }
}else {
    $arr = ["result" => "error", "message" => "Fail to get the post's ID."];
}

echo json_encode($arr);
