// DOM query selectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to add new task to tasks-to-do
var taskFormHandler = function(event) {
    // prevent page refresh by default
    event.preventDefault();

    // get form input information and store in variables
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send as argument to createTaskEl function
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // create list item    
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // crate div to hold info and add to list
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    // add html content to div
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name} </h3><span class="task-type">${taskDataObj.type} </span>`;
    
    // add to each respective parent element to add to DOM
    listItemEl.appendChild(taskInfoEl)
    tasksToDoEl.appendChild(listItemEl);
}

// event listeners
formEl.addEventListener("submit", taskFormHandler);