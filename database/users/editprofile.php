<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);
if (isset($username)) {
    //Update profil user
    $sql = "UPDATE user SET nama = ?, gender=?, tanggal_lahir= ? , email= ?, lokasi= ?, bio = ? WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $nama, $gender, $tanggal_lahir, $email, $lokasi, $bio, $username);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        //Jika user juga mengupdate profile picture
        if ($url != "" || str_contains($url, 'data:image/jpeg;base64')) {
            if (file_exists("images/" . $username . ".jpg")) {
                @unlink("images/" . $username . ".jpg");
            }
            $img = str_replace('data:image/jpeg;base64,', '', $url);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            if (file_put_contents("images/" . $username . ".jpg", $data)) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "sql error: $sql"];
            }
        } else { //Kalau tidak update
            $arr = ["result" => "success"];
        }
    } else {
        $arr = ["result" => "error", "message" => "There's an error in updating your profile."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error in getting your username."];
}

echo json_encode($arr);
