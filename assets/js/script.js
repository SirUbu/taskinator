// DOM query selectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// global variables
var taskIdCounter = 0;

// function gather form data when submit event is triggered 
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

// function to create and add the form data to the DOM
var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // add task id as a custom attrubute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // crate div to hold info and add to list
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    // add html content to div, append to listItemEl
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name} </h3><span class="task-type">${taskDataObj.type} </span>`;
    listItemEl.appendChild(taskInfoEl)
    
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);

    tasksToDoEl.appendChild(listItemEl);

    // append entire listItemEl to tasksToDoEl
    tasksToDoEl.appendChild(listItemEl);

    // increment task counter for next unique id
    taskIdCounter++;
}

// function to dynamically add form elements to each task
var createTaskActions = function(taskId) {
    // create container DOM element
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button, append to container element
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button, append to container element
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown, append to container element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    // variable to hold statusChoices
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // loop through statusChoices and add them as option elements
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

// event listeners
formEl.addEventListener("submit", taskFormHandler);