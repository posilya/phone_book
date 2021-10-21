<?php
require_once 'pdo_config.php';

try {
	$db_conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
} catch (PDOException $pe) {
	die("Ничего не вышло: " . $pe->getMessage());
}
?>