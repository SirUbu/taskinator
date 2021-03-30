// DOM query selectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to add new task to tasks-to-do
var createTaskHandler = function(event) {
    event.preventDefault();
    
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "A New Task";
    tasksToDoEl.appendChild(taskItemEl);
}

// event listeners
formEl.addEventListener("submit", createTaskHandler);