<?php
require_once(realpath('../../db_connect.php'));

$query = $db_conn->prepare("DELETE FROM `main` WHERE `id` = ?");

$r = $query->execute(array($_POST['id']));

if ($r) {
	echo 'ok';
} else {
	echo 'error';
}
?>