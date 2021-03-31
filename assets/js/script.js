// DOM query selectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

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

    // check if editing an existing task
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, to get task id and call function to complete edit 
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, create object as normal and pass on
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        // send as argument to createTaskEl function
        createTaskEl(taskDataObj);
    }
};

// function to edit existing task with form inputs
var completeEditTask = function(taskName, taskType, taskId) {
    // find the marching task list item
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    // reset form 
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

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
};

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
};

// function to handle task button clicking
var taskButtonHandler = function(event) {
    // get target element from event and task id
    var targetEl = event.target;
    var taskId = targetEl.getAttribute("data-task-id");

    // if edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        editTask(taskId);
    }
    // if delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // pass taskId into deleteTask function
        deleteTask(taskId);
    }
};

// function to edit a task
var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // update form with taskSelected content
    document.querySelector(`input[name="task-name"]`).value = taskName;
    document.querySelector(`select[name="task-type"]`).value = taskType;

    // change submit button to Save Task
    document.querySelector("#save-task").textContent = "Save Task";

    // include tasks id
    formEl.setAttribute("data-task-id", taskId);
}

// function to delete a DOM element
var deleteTask = function(taskId) {
    // use taskId to select task to be deleted and remove it
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    taskSelected.remove();
};

// function to handle change of task status drop down
var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on id
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    // move task to appropriate parent list
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

// event listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);