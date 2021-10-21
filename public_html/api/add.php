<?php
require_once(realpath('../../db_connect.php'));

$query = $db_conn->prepare("INSERT INTO `main` (`name`, `phone`, `note`) VALUES (?, ?, ?)");

$r = $query->execute(array($_POST['name'], $_POST['phone'], $_POST['note']));

if ($r) {
	echo 'ok';
} else {
	echo 'error';
}
?>