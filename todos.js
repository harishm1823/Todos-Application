/* Follow the instructions found in the description to complete the JavaScript functionality.*/

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInputElement = document.getElementById("todoUserInput");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter valid task text");
        userInputElement.focus();
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
    userInputElement.focus();
}

addTodoButton.onclick = function() {
    onAddTodo();
};

userInputElement.onkeydown = function(event) {
    if (event.key === "Enter") {
        onAddTodo();
    }
};

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked", checkboxElement.checked);
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    if (todoElement) {
        todoItemsContainer.removeChild(todoElement);
    }

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        return ("todo" + eachTodo.uniqueNo) === todoId;
    });

    if (deleteElementIndex !== -1) {
        todoList.splice(deleteElementIndex, 1);
    }
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("todo-row");
    todoElement.appendChild(rowContainer);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };
    rowContainer.appendChild(inputElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    rowContainer.appendChild(labelElement);

    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("aria-label", "Delete task");
    deleteButton.onclick = function() {
        onDeleteTodo(todoId);
    };

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "trash-icon.png";
    deleteIcon.alt = "Delete";
    deleteIcon.classList.add("delete-icon");
    deleteButton.appendChild(deleteIcon);

    rowContainer.appendChild(deleteButton);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}