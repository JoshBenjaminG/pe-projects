var todos = [];
var count = 0;

const $form = document.querySelector('form');
const $input = document.querySelector('input');
var $output = document.querySelector('output');


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
	$output.innerHTML = template;
}

$form.addEventListener('submit', function(event) {
	event.preventDefault();
	add($input.value);
	$input.value = "";

	console.log(todos);
});

$output.addEventListener('click', function(event) {	
	if (event.target.textContent == 'remove') {
		const id = event.target.closest('li').dataset.id;
		remove(id);
	}
});






