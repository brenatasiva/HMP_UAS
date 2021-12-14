<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);
if (isset($idpost)) {
    //Update post
    $sql = "UPDATE post SET caption=?, uploaded_at=? WHERE $idpost=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $caption, $uploaded_at, $idpost);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        if ($url != "") {
            @unlink("images/" . $idpost . ".jpg");

            $img = str_replace('data:image/jpeg;base64,', '', $url);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            if (file_put_contents("images/" . $idpost . ".jpg", $data)) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "Fail to upload the image."];
            }
        } else {
            $arr = ["result" => "success"];
        }
    } else {
        $arr = ["result" => "error", "message" => "Fail to update post."];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to get the post's ID."];
}

echo json_encode($arr);
