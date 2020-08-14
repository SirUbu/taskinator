var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// new task creation function
var createTaskHandler = function () {
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is a new task";
    tasksToDoEl.appendChild(taskItemEl);
};

// observe the click event listener behavior specific to the button and run createTaskHandler function
buttonEl.addEventListener("click", createTaskHandler);

