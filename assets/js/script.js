// DOM query selectors
var buttonEL = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to add new task to tasks-to-do
var createTaskHandler = function() {
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "A New Task";
    tasksToDoEl.appendChild(taskItemEl);
}

// event listeners
buttonEL.addEventListener("click", createTaskHandler);