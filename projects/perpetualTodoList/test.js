const todoApp = {
	todos: [],
	count: 0,

	print(note = "") {
		console.log(`---${note}`);
		console.log("todos: ", this.todos);
	},

	add(content) {
		const todo = {
			id: this.count++,
			content: content,
		};
		this.todos = [...this.todos, todo];
		this.print(`added ${content}`);
	},

	remove(id) {
		this.todos.splice(id, 1);
		this.print(`removed ${this.todos[id].content}`);
	},

	update(id, newText) {
		this.todos[id].content = newText;
		this.print(`updated to ${newText}`);
	},
}

todoApp.add("first one");
todoApp.add("second one");
todoApp.add("third one");
todoApp.update(0, "new one");
todoApp.remove(1);