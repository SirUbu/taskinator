// GLOBAL VARIABLES 
    // get the entire form input for the task submit, store in var
    var formEl = document.querySelector("#task-form");
    // get each task section (to do, in progress, completed) list and store in its own var
    var tasksToDoEl = document.querySelector("#tasks-to-do");
    var tasksInProgressEl = document.querySelector("#tasks-in-progress");
    var tasksCompletedEl = document.querySelector("#tasks-completed");
    // var for taskIdCounter
    var taskIdCounter = 0;
    // get the main section of the page, store in var
    var pageContentEl = document.querySelector("#page-content");
    // empty array variable for tasks to be added to for localStorage
    var tasks = [];

// FUNCTIONS FOR APPLICATION OPERATION
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
        // check form data is for an existing task being edited
        var isEdit = formEl.hasAttribute("data-task-id");
        // if existing task, get task id and call function to complete edit process
        if(isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        // if new task
        } else {
            // package up data as an object
            var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput,
                status: "to do"
            };
            // send object to createTaskEl
            createTaskEl(taskDataObj);
        }
    };
    // function to set new list item data
    var createTaskEl = function(taskDataObj) {
        // crete a new list item to be set
        var listItemEl = document.createElement("li");
        // give class name to new list item 
        listItemEl.className = "task-item";
        // add task id as a custom attribute
        listItemEl.setAttribute("data-task-id", taskIdCounter);
        // make the task item draggable
        listItemEl.setAttribute("draggable", "true");
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
        // text taskId at current counter to the taskDataObj
        taskDataObj.id = taskIdCounter;
        // push to the taskDataObj
        tasks.push(taskDataObj);
        // run function to save tasks array to localStorage 
        saveTasks();
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
    // function that start to edit the task
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
    // function to complete the edit of the task
    var completeEditTask = function(taskName, taskType, taskId) {
        // find task that is being edited
        var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        // set new values to task
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;
        // loop through tasks array and update task object with new content
        for(var i = 0; i <tasks.length; i++) {
            if(tasks[i].id === parseInt(taskId)) {
                tasks[i].name = taskName;
                tasks[i].type = taskType;
            }
        };
        // run function to save tasks array to localStorage 
        saveTasks();
        alert("Task Updated!");
        // reset form and change button back
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    };
    // function that deletes the task
    var deleteTask = function(taskId) {
        // get task list item element by taskId of button clicked
        var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        // remove that task list item entirely
        taskSelected.remove();
        // create new array to hold updated list of tasks
        var updatedTaskArr = [];
        // loop through current tasks
        for(var i = 0; i < tasks.length; i++) {
            // if tasks[i].id doesn't match value of taskId, keep that task
            if(tasks[i].id !== parseInt(taskId)) {
                updatedTaskArr.push(tasks[i]);
            }
        }
        // reassign tasks array to be the same as updatedTaskArr
        tasks = updatedTaskArr;
        // run function to save tasks array to localStorage 
        saveTasks();
    };
    // function for change of task status
    var taskStatusChangeHandler = function(event) {
        // get the task item id
        var taskId =  event.target.getAttribute("data-task-id");
        // get the currently selected option value and convert to lowercase
        var statusValue = event.target.value.toLowerCase();
        // find the parent task item element based on the id
        var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        // depending on what status is selected, move to that list column
        if(statusValue === "to do") {
            tasksToDoEl.appendChild(taskSelected);
        } else if(statusValue === "in progress") {
            tasksInProgressEl.appendChild(taskSelected);
        } else if(statusValue === "completed") {
            tasksCompletedEl.appendChild(taskSelected);
        }
        // loop through tasks array and update task object with new content
        for(var i = 0; i <tasks.length; i++) {
            if(tasks[i].id === parseInt(taskId)) {
                tasks[i].status = statusValue;
            }
        };
        // run function to save tasks array to localStorage 
        saveTasks();
    };
    // function for drag and drop of task
    var dragTaskHandler = function(event) {
        // grab taskId of element being dragged
        var taskId =  event.target.getAttribute("data-task-id");
        // store the taskId of the dragged task as plain text in the dataTransfer
        event.dataTransfer.setData("text/plain", taskId);
    };
    // function for the "drop zone" of a dragged item
    var dropZoneDragHandler = function(event) {
        // ensure task is being dragged over an area where there is a parent element with the class .task-list
        var taskListEl = event.target.closest(".task-list");
        // if being dragged over an appropriate area...
        if(taskListEl) {
            // prevent dropped item from returning to original place
            event.preventDefault();
            // change style of area 
            taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
        }
    };
    // function for the drop of an item
    var dropTaskHandler = function(event) {
        // get the previously set taskId number for the task being dropped
        var id = event.dataTransfer.getData("text/plain");
        // use the taskId to get the task being dropped
        var draggableElement = document.querySelector(`[data-task-id="${id}"]`);
        // get the drop zone element if in a task status list
        var dropZoneEl = event.target.closest(".task-list");
        // set var for the id of the dropZoneEl
        var statusType = dropZoneEl.id;
        // set status of task based on dropZone id
        var statusSelectEl = draggableElement.querySelector(`select[name="status-change"]`);
        // change the status drop down of the task to the drop zone list type
        if(statusType === "tasks-to-do") {
            statusSelectEl.selectedIndex = 0;
        } else if(statusType === "tasks-in-progress") {
            statusSelectEl.selectedIndex = 1;
        } else if(statusType === "tasks-completed") {
            statusSelectEl.selectedIndex = 2;
        }
        // remove styling set during drag 
        dropZoneEl.removeAttribute("style");
        // append the task to the intended drop zone
        dropZoneEl.appendChild(draggableElement);
        // loop through tasks array and update task object with new content
        for(var i = 0; i <tasks.length; i++) {
            if(tasks[i].id === parseInt(id)) {
                tasks[i].status = statusSelectEl.value.toLowerCase();
            }
        };
        // run function to save tasks array to localStorage 
        saveTasks();
    };
    // function for when the dragged item leaves an drop zone
    var dragLeaveHandler = function(event) {
        var taskListEl = event.target.closest(".task-list");
        if(taskListEl) {
            taskListEl.removeAttribute("style");
        }
    };
    // function to save tasks array to localStorage
    var saveTasks = function() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    // function to load saved tasks array from localStorage
    var loadTasks = function() {
        // get task items from localStorage
        tasks = localStorage.getItem("tasks");
        // check if tasks is null/falsy, if so make tasks an empty array again
        if(!tasks) {
            tasks = [];
            return false;
        }
        // convert tasks from stringified format back into an array of objects
        tasks = JSON.parse(tasks);
        // Iterate through tasks array and create task elements on the page from it
        for(var i = 0; i < tasks.length; i++) {
            taskIdCounter = tasks[i].id;
            var listItemEl = document.createElement("li");
            listItemEl.className = "task-item";
            listItemEl.setAttribute("data-task-id", tasks[i].id);
            listItemEl.setAttribute("draggable", "true");
            var taskInfoEl = document.createElement("div");
            taskInfoEl.className = "task-info";
            taskInfoEl.innerHTML = `<h3 class="task-name">${tasks[i].name}</h3><span class="task-type">${tasks[i].type}</span>`;
            listItemEl.appendChild(taskInfoEl);
            var taskActionsEl = createTaskActions(tasks[i].id);
            listItemEl.appendChild(taskActionsEl);
            var statusValue = tasks[i].status.toLowerCase();
            var statusSelectEl = listItemEl.querySelector(`select[name="status-change"]`);
            if(statusValue === "to do") {
                statusSelectEl.selectedIndex = 0;
                tasksToDoEl.appendChild(listItemEl);
            } else if(statusValue === "in progress") {
                statusSelectEl.selectedIndex = 1;
                tasksInProgressEl.appendChild(listItemEl);
            } else if(statusValue === "completed") {
                statusSelectEl.selectedIndex = 2;
                tasksCompletedEl.appendChild(listItemEl);
            }
            taskIdCounter++;
        };
    };

// EVENT LISTENERS
    // observe submit event listener behavior specific to the button, then run createTaskHandler function
    formEl.addEventListener("submit", taskFormHandler);
    // event listener for the individual tasks buttons, run button function
    pageContentEl.addEventListener("click", taskButtonHandler);
    // event listener for change of status of task, run status change function
    pageContentEl.addEventListener("change", taskStatusChangeHandler);
    // event listener for dragstart, run drag task function
    pageContentEl.addEventListener("dragstart", dragTaskHandler);
    // event listener for "drop zones" of dragged items, run drop zone function
    pageContentEl.addEventListener("dragover", dropZoneDragHandler);
    // event listener for the drop of a dragged item, run drop task function
    pageContentEl.addEventListener("drop", dropTaskHandler);
    // event listener for the dragged item leaving a drop zone, run drip leave function
    pageContentEl.addEventListener("dragleave", dragLeaveHandler);
    // call the loadTasks function to update the tasks array at the load of the page

// call the loadTasks function
loadTasks();