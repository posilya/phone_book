<?php
require_once(realpath('../../db_connect.php'));

$query = $db_conn->prepare("SELECT * FROM `main` ORDER BY `id`");
$query->execute();

$arr = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($arr);
?>