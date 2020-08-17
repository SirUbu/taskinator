// get the entire form input for the task submit, store in var
var formEl = document.querySelector("#task-form");
// get the task "To Do" section list, store in var
var tasksToDoEl = document.querySelector("#tasks-to-do");
// var for taskIdCounter
var taskIdCounter = 0;
// get the main section of the page, store in var
var pageContentEl = document.querySelector("#page-content");

// function to get new list items from input form 
var taskFormHandler = function (event) {
    // prevent default browser action (don't want refresh)
    event.preventDefault();
    // get the "Task Name" input
    var taskNameInput = document.querySelector(`input[name="task-name"]`).value;
    // get the "Task Type" input
    var taskTypeInput = document.querySelector(`select[name="task-type"]`).value;
    /// check if input values are empty strings (falsy)
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task from!");
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
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give new div a class name name
    taskInfoEl.className = "task-info"
    // add HTML content including task name and input to div
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.type}</span>`;
    // append newly created div to bottom/child of created list item
    listItemEl.appendChild(taskInfoEl);
    // run the function to append buttons and drop down to the new task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // increase task counter for next unique id
    taskIdCounter++;
};

// function to add form elements (buttons and drop downs) to each newly created task
var createTaskActions = function(taskId) {
    // create new div as container for elements and give class name
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create and append edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // create and append delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // create and append drop down with selections
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++) {
        //create option elements and append to dropdown
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);
    // return container as function result
    return actionContainerEl;
};

// function to determine and run individual tasks buttons 
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
    // if edit button clicked
    if(targetEl.matches(".edit-btn")) {
        // get the clicked element task id
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    // if clicked target matches delete-btn class
    } else if(targetEl.matches(".delete-btn")) {
        // get the clicked element task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// function that edits the task
var editTask = function(taskId) {
    // get task list item element by taskId of button clicked
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    // get content from task name and type and place it back in the form to be changed by user
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector(`input[name="task-name"]`).value = taskName;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector(`select[name="task-type"]`).value = taskType;
    // change submit button on form to save save
    document.querySelector("#save-task").textContent = "Save Task";
    // add taskId to the form for task being changed
    formEl.setAttribute("data-task-id", taskId);
};

// function that deletes the task
var deleteTask = function(taskId) {
    // get task list item element by taskId of button clicked
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    // remove that task list item entirely
    taskSelected.remove();
};

// observe submit event listener behavior specific to the button, then run createTaskHandler function
formEl.addEventListener("submit", taskFormHandler);

// event listener for the individual tasks buttons, run button function
pageContentEl.addEventListener("click", taskButtonHandler);

