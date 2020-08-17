// get the entire for input for the task submit, store in var
var formEl = document.querySelector("#task-form");
// get the task "To Do" section list, store in var
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to get new list item from input form 
var taskFormHandler = function (event) {
    // prevent default browser action (don't want refresh)
    event.preventDefault();
    // get the "Task Name" input
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // get the "Task Type" input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    /// check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task from!");
        return false;
    }
    // reset the form inputs so that a new task can be made
    formEl.reset();
    // package up data as am object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    // send object to createTaskEl
    createTaskEl(taskDataObj);
};

// function to set new list item data
var createTaskEl = function(taskDataObj) {
    // crete a new list item to be set
    var listItemEl = document.createElement("li");
    // give class name to new list item 
    listItemEl.className = "task-item";
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give new div a class name name
    taskInfoEl.className = "task-info"
    // add HTML content including task name and input to div
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.type}</span>`;
    // append newly created div to bottom/child of created list item
    listItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

// observe submit event listener behavior specific to the button, then run createTaskHandler function
formEl.addEventListener("submit", taskFormHandler);

