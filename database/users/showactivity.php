<?php
header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160419144", "ubaya", "hybrid_160419144");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
}

extract($_POST);

if (isset($username)) {
    $data = array();
    //Ambil kegiatan apa saja yang berhubungan dengan user (dapat like dari user lain, dapat comment dari user lain, dan dapat following dari user lain) lalu diurutkan berdasarkan tanggalnya.
    $sql = "SELECT a.*, f.* FROM action a INNER JOIN user u ON u.username = a.username INNER JOIN follow f ON f.following = u.username WHERE a.username = ? GROUP BY action_at, follow_at ORDER BY follow_at, action_at";
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
        $arr = ["result" => "error", "message" => "There's an error in getting the user."];
    }
} else {
    $arr = ["result" => "error", "message" => "There's an error while getting the POST parameter."];
}

echo json_encode($arr);
