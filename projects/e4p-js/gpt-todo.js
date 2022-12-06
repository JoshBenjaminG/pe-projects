// Create an empty array to store our to-do items
let todoList = [];

// Function to add a new item to the to-do list
function addItem(item) {
    todoList.push(item);
}

// Function to remove an item from the to-do list
function removeItem(item) {
    let index = todoList.indexOf(item);
    if (index !== -1) {
        todoList.splice(index, 1);
    }
}

// Function to display the current to-do list
function displayList() {
    for (let i = 0; i < todoList.length; i++) {
        console.log(todoList[i]);
    }
}

// Add some items to our to-do list
addItem("Buy milk");
addItem("Pick up dry cleaning");
addItem("Finish homework");

// Display the current to-do list
displayList();

// Remove an item from the list
removeItem("Finish homework");

// Display the updated to-do list
displayList();