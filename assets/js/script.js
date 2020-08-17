var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// new task creation function
var createTaskHandler = function (event) {
    event.preventDefault();
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(taskItemEl);
};

// observe the click event listener behavior specific to the button and run createTaskHandler function
formEl.addEventListener("submit", createTaskHandler);

