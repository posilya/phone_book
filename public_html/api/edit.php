<?php
require_once(realpath('../../db_connect.php'));

$query = $db_conn->prepare("UPDATE `main` SET `name` = ?, `phone` = ?, `note` = ? WHERE `id` = ?");

$r = $query->execute(array($_POST['name'], $_POST['phone'], $_POST['note'], $_POST['id']));

if ($r) {
	echo 'ok';
} else {
	echo 'error';
}
?>