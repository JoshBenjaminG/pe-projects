var todos = [];
var count = 0;

const $output = document.querySelector('output');
const $one = document.querySelector('#one');
const $two = document.querySelector('#two');
const $dombody = document.querySelector('dombody');

function add(content) {
	const todo = {
		id: `a-${count++}`,
		content: content,
		complete: false,
	};
	todos = [...todos, todo];
	renderTodos(todos);
}

function remove(id) {
	const filtered = todos.filter (function(todo) {
		return todo.id != id;
	});

	todos = [...filtered];
	renderTodos(todos);
}

function complete(id) {
	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id == id) {
			todos[i].complete = true;
		}
	}
	renderTodos(todos);
}

function renderTodo(todo) {
	return `
		<li data-id=${todo.id}>
			<card>
			<h2>${todo.content}</h2>

			<actions>
				<button>remove</button>
			</actions>

			</card>
		</li>
	`;
}

function renderTodos(todos) {
	var template = "<ul>";
	todos.forEach (function(todo) {
		template += renderTodo(todo);
	});
	template += "</ul>";
	$dombody.innerHTML = template;
}

$dombody.addEventListener('click', function(event) {	
	if (event.target.textContent == 'remove') {
		const id = event.target.closest('li').dataset.id;
		remove(id);
	}
});

$one.addEventListener('click', function(event){
	event.preventDefault();
	template = 
	`<form action="">
		<field>
			<label>Enter a Todo Below</label>
			<input>
		</field>

		<button type="submit">Add</button>
	</form>`
	;
	$output.innerHTML = template;
	const $form = document.querySelector('form');
	const $input = document.querySelector('input');
	$form.addEventListener('submit', function(event) {
		event.preventDefault();
		add($input.value);
		$input.value = "";
});
});

$two.addEventListener('click', function(event){
	event.preventDefault();
	template = "hello two";
	$output.innerHTML = template;
});

