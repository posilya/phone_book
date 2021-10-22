let h = new Map();
h.set('add', 'Добавить контакт');
h.set('edit', 'Изменить контакт');
h.set('delete', 'Удалить контакт?');

function update_table() {
	const request = new XMLHttpRequest();

	url = 'api/get';

	request.open('GET', url);
	request.send();

	request.onload = function() {
		let data = JSON.parse(request.response);
		console.log(data);


		document.querySelectorAll('tr[db]').forEach(function (node) {
			node.remove();
		});

		table = document.getElementsByTagName('tbody')[0];
		data.forEach(function (contact) {
			let row = document.createElement('tr');
			row.setAttribute('db', contact.id);

			row.innerHTML = '<td>' + contact.name + '</td>' +
				'<td><a href="tel:' + contact.phone + '">'  + contact.phone +  '</a></td>' +
				'<td>' + contact.note + '</td>' +
				'<td><a class="delete">Удалить</a> / <a class="edit">Редактировать</a></td>';

			table.append(row);
		});

		add_onclick();
	};
}

function api_send(name, phone, note, id) {
	const request = new XMLHttpRequest();

	let data = new FormData();
	data.append('name', name);
	data.append('phone', phone);
	data.append('note', note);

	let url;
	if (id == -1) {
		url = 'api/add';
	} else {
		url = 'api/edit';
		data.append('id', id);
	}

	request.open('POST', url);
	request.send(data);

	request.onload = function() {
		if (request.response == 'ok') {
			close_popup();
		} else {
			console.log('Ошибка при записи в БД');
			//todo сделать красиво
		}
	};
}

function api_delete(id) {
	const request = new XMLHttpRequest();

	let data = new FormData();
	data.append('id', id);

	let url = 'api/delete';

	request.open('POST', url);
	request.send(data);

	request.onload = function() {
		if (request.response == 'ok') {
			close_popup();
		} else {
			console.log('Ошибка при записи в БД');
			//todo сделать красиво
		}
	};
}

function add_popup(act, db=-1) {
	document.body.classList.add('no-scroll');

	let popup_bg = document.createElement('div');
	popup_bg.className = 'popup-bg';
	document.getElementsByTagName('main')[0].after(popup_bg);

	let popup = document.createElement('div');
	popup.className = 'popup';
	popup.innerHTML = '<h1>' + h.get(act) + '</h1>';

	let values;
	if (act == 'edit') {
		values = get_values(db);
	} else if (act == 'add') {
		values = ['', '', ''];
	}

	if (act == 'edit' || act == 'add') {
		popup.innerHTML += `
			<form id="form">
				<div>
					<label for="name">ФИО</label>
					<input type="text" id="name" value="${values[0]}">
				</div>

				<div>
					<label for="phone">Телефон</label>
					<input type="tel" id="phone" value="${values[1]}">
				</div>

				<div>
					<label for="note">Кем приходится</label>
					<input type="text" id="note" value="${values[2]}">
				</div>
			</form>

			<a class="save">Сохранить</a><a class="cancel">Отмена</a>
		`

		let name = popup.querySelector('#name');
		name.oninput = function() {
			name.value = name.value.slice(0, 255);
		};

		let phone = popup.querySelector('#phone');
		phone.oninput = function() {
			phone.value = phone.value.replace(/[^+\d]/g, '').slice(0, 20);
		};

		let note = popup.querySelector('#note');
		note.oninput = function() {
			note.value = note.value.slice(0, 255);
		};

		popup.querySelector('.save').onclick = function() {
			api_send(name.value, phone.value, note.value, db);
		};
	} else {
		popup.innerHTML += `
			<a class="delete">Удалить</a><a class="drop">Отмена</a>
		`

		popup.querySelector('.delete').onclick = function() {
			api_delete(db);
		}
	}

	popup.querySelector('.cancel, .drop').onclick = function() {
		close_popup();
	};

	popup_bg.append(popup);
}

function close_popup() {
	document.body.classList.remove('no-scroll');
	update_table();
	document.querySelector('.popup-bg').remove();
}

function get_values(db) {
	let node = document.querySelector(`[db="${db}"]`);
	let child = node.querySelectorAll('td');

	let r = new Array();

	for (let i = 0; i < 3; i++) {
		r.push(child[i].textContent);
	}

	return r;
}

function add_onclick() {
	document.querySelectorAll('.delete').forEach(function(elem) {
		elem.onclick = function() {
			add_popup('delete',  elem.parentNode.parentNode.getAttribute('db'));
		};
	});
	
	document.querySelectorAll('.edit').forEach(function(elem) {
		elem.onclick = function() {
			add_popup('edit', elem.parentNode.parentNode.getAttribute('db'));
		};
	});	
}

add_onclick();

document.getElementsByClassName('add')[0].onclick = function() {
	add_popup('add');
};
