<?php
require_once(realpath('../db_connect.php'));
?>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8">
		<title>Телефонный справочник</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body></body>
		<header>
			<h1>Телефонный справочник</h1>
		</header>
		<main>
			<?php
			$query = $db_conn->prepare("SELECT * FROM `main` ORDER BY `id`");
			$query->execute();

			$contacts = $query->fetchAll(PDO::FETCH_ASSOC);

			if (empty($contacts)) {
				echo '<p>Мне нечего тебе показать :(</p>';
			} else {
				?>
				<table>
				<tr>
					<th>ФИО</th>
					<th>Телефон</th>
					<th>Кем приходится</th>
					<th>Действие</th>
				</tr>
				<?php
				foreach ($contacts as $contact) {
					echo '<tr db="' . $contact[id] . '">';
					echo '<td>' . $contact[name] . '</td>';
					echo '<td><a href="tel:' . $contact[phone] . '">' . $contact[phone] . '</a></td>';
					echo '<td>' . $contact[note] . '</td>';
					echo '<td><a class="delete">Удалить</a> / <a class="edit">Редактировать</a></td>';
					echo '</tr>';
				}
				echo '</table>';
			}
			?>
			<div><a class="add">Добавить</a></div>
		</main>

		<script src="script.js"></script>
	</body>
</html>