<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);
if (isset($username)) {
    //Insert post
    $sql = "INSERT INTO post (caption, username, uploaded_at) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $caption, $username, $date);
    $stmt->execute();
    if($stmt->affected_rows > 0){
        //Kalau user memasukkan gambar ke dalam post
        if ($url != "") {
            $idpost = $stmt->insert_id;
            $img = str_replace('data:image/jpeg;base64,', '', $url);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            if (file_put_contents("images/" . $idpost . ".jpg", $data)) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "Fail to upload the image."];
            }
        } else { //Kalau tidak ada gambar yang dimasukkan
            $arr = ["result" => "success"];
        }
    } else {
        $arr = ["result" => "error", "message" => "Fail to insert post."];
    }
} else {
    $arr = ["result" => "error", "message" => "Fail to get the username."];
}

echo json_encode($arr);
