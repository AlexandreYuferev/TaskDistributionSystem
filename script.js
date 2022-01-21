
function createGroupOfTask(groupID) {

	let containerForGroupOfTask = document.createElement("div");
	containerForGroupOfTask.setAttribute("class", "containerForGroupOfTask");
	containerForGroupOfTask.setAttribute("id"   , groupID);

	let nameOfGroupOfTask = document.createElement("div");
	nameOfGroupOfTask.setAttribute("class", "nameOfGroupOfTask");
	nameOfGroupOfTask.setAttribute("id"   , groupID);
	nameOfGroupOfTask.innerHTML = objectServerResponse[groupID][0];

	let groupOfTask = document.createElement("div");
	groupOfTask.setAttribute("class", "groupOfTask"); 
	groupOfTask.setAttribute("id"   , groupID);

	containerForGroupOfTask.insertAdjacentElement("afterbegin", nameOfGroupOfTask);
	containerForGroupOfTask.insertAdjacentElement("beforeend" , groupOfTask);
	groupOfTask.insertAdjacentElement("afterbegin", addTaskCreateButton(groupID));

	return containerForGroupOfTask;
}

function addTaskCreateButton(groupID) {

	let taskCreateButton = document.createElement("button");
	taskCreateButton.setAttribute("class", "taskCreateButton");
	taskCreateButton.setAttribute("id"   , groupID);
	taskCreateButton.setAttribute("type" , "button");
	taskCreateButton.innerHTML = "Создать задачу"; // Create task
	taskCreateButton.addEventListener(
		'click', function() { createTask(groupID); }, false);
	
	return taskCreateButton;
}

function createTask(groupID) {
	document.querySelector("button.taskCreateButton#" + groupID).remove();
	let groupOfTask = document.querySelector("div.groupOfTask#" + groupID); 
	groupOfTask.insertAdjacentElement("beforeend", createOrderForNewTask(groupID));
	groupOfTask.scrollTop = groupOfTask.scrollHeight;
} 

function createOrderForNewTask(groupID) {

	let orderForNewTask = document.createElement("div");
	orderForNewTask.setAttribute("class", "orderForNewTask");
	orderForNewTask.setAttribute("id"   , groupID);

	let textareaForTextOfTask = document.createElement("textarea");
	textareaForTextOfTask.setAttribute("class"      , "forTextOfTask");
	textareaForTextOfTask.setAttribute("id"         , groupID);
	textareaForTextOfTask.setAttribute("type"       , "text");
	textareaForTextOfTask.setAttribute("placeholder", "Что нужно сделать?"); // What should be done

	let boxForButton = document.createElement("div");
	boxForButton.setAttribute("class", "boxForButton");

	let taskAddButton = document.createElement("button");
	taskAddButton.setAttribute("class", "taskAddButton");
	taskAddButton.setAttribute("id"   , groupID);
	taskAddButton.setAttribute("type" , "button");
	taskAddButton.innerHTML = "Добавить"; // Add
	taskAddButton.addEventListener(
		'click', function() { addTask(groupID); }, false);
	
	let taskCancelAddingButton = document.createElement("button");
	taskCancelAddingButton.setAttribute("class", "taskCancelAddingButton");
	taskCancelAddingButton.setAttribute("id"   , groupID);
	taskCancelAddingButton.setAttribute("type" , "button");
	taskCancelAddingButton.innerHTML = "Отмена"; // Cancel
	taskCancelAddingButton.addEventListener(
		'click', function() { cancelAddingTask(groupID); }, false);

	orderForNewTask.insertAdjacentElement("afterbegin", textareaForTextOfTask);
	orderForNewTask.insertAdjacentElement("beforeend" , boxForButton);
	boxForButton.insertAdjacentElement("afterbegin", taskAddButton);
	boxForButton.insertAdjacentElement("beforeend" , taskCancelAddingButton);

	return orderForNewTask;
}

function addTask(groupID) {

	let groupOfTask = document.querySelector(".groupOfTask#"   + groupID);
	let textOfTask  = document.querySelector(".forTextOfTask#" + groupID).value;

	let taskID = "taskID_" + (Object.values(objectServerResponse[groupID][1]).length + 1);

	if (textOfTask != "") {
		groupOfTask.insertAdjacentElement("beforeend", appendNewTask(groupID, taskID, textOfTask));
		document.querySelector(".orderForNewTask#"  + groupID).remove();
		groupOfTask.appendChild(addTaskCreateButton(groupID));
	} else {
		alert("Отсутствует текст нового задания!"); // The text of the new task is missing 
	}	
}

function cancelAddingTask(groupID) {

	let groupOfTask = document.querySelector(".groupOfTask#"   + groupID);
	let textOfTask  = document.querySelector(".forTextOfTask#" + groupID).value;

	function removeOrderForNewTaskAndAddTaskCreateButton(groupID) {
		document.querySelector("div.orderForNewTask#" + groupID).remove();
		groupOfTask.insertAdjacentElement("beforeend", addTaskCreateButton(groupID));
	}

	if (textOfTask != "") {
		if (confirm("Отменить создание новой задачи?")) { // Cancel new task creation
			removeOrderForNewTaskAndAddTaskCreateButton(groupID); }
	} else { removeOrderForNewTaskAndAddTaskCreateButton(groupID); } 
}

function appendNewTask(groupID, taskID, taskContent) {

	let taskContainer = document.createElement("div");
	taskContainer.setAttribute("id", groupID + "_" + taskID);
	taskContainer.setAttribute("class" , "taskContainer");

	let textareaWithTextOfTask = document.createElement("textarea");
	textareaWithTextOfTask.setAttribute("id", groupID + "_" + taskID);
	textareaWithTextOfTask.setAttribute("type"    , "text");
	textareaWithTextOfTask.setAttribute("class"   , "textOfTask");
	textareaWithTextOfTask.setAttribute("readonly", "readonly");
	textareaWithTextOfTask.innerHTML = taskContent;
	
	let menu = document.createElement("button");
	menu.setAttribute("id", groupID + "_" + taskID);
	menu.setAttribute("class", "menu");
	menu.setAttribute("type" , "button");
	menu.innerHTML = "Меню"; // menu
	menu.addEventListener(
		'click', function() { setTimeout(() => { createMenu(menu.id); }, 25); }, false);

	taskContainer.appendChild(textareaWithTextOfTask);
	taskContainer.appendChild(menu);

  return taskContainer;
}

/* ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== */

function createMenu(id) {

	let containerForActionsList = document.createElement("div");
	containerForActionsList.setAttribute("class", "actionsList");
	containerForActionsList.setAttribute("id"   , id);

	let taskMoveButton = document.createElement("button");
	taskMoveButton.setAttribute("class", "actionMoveTo");
	taskMoveButton.setAttribute("id"   , id);
	taskMoveButton.innerHTML = "Переместить в:"; // move to
	taskMoveButton.addEventListener(
		'click', function() { unnameFunction(id); }, false);

	let taskEditButton = document.createElement("button");
	taskEditButton.setAttribute("class", "actionEdit");
	taskEditButton.setAttribute("id"   , id);
	taskEditButton.innerHTML = "Редактировать"; // edit

	let taskDeleteButton = document.createElement("button");
	taskDeleteButton.setAttribute("class", "actionDelete");
	taskDeleteButton.setAttribute("id"   , id);
	taskDeleteButton.innerHTML = "Удалить"; // delete
	
	containerForActionsList.insertAdjacentElement("beforeend", taskMoveButton);
	containerForActionsList.insertAdjacentElement("beforeend", taskEditButton);
	containerForActionsList.insertAdjacentElement("beforeend", taskDeleteButton);
	
	let menuButton = document.querySelector(".menu#" + id);
	let clientMenuPosition = menuButton.getBoundingClientRect();

	let mainArea = document.querySelector(".mainArea");
	if(document.querySelector(".actionsList#" + id) == null) {
		containerForActionsList.style.left = clientMenuPosition.left  + 
																				 clientMenuPosition.width + "px";
		containerForActionsList.style.top  = clientMenuPosition.top   + "px";
		mainArea.insertAdjacentElement("beforeend", containerForActionsList);
	}
}

function unnameFunction(id) {

	let containerForNestedActionsList = document.createElement("div");
	containerForNestedActionsList.setAttribute("class", "nestedActionsList");
	containerForNestedActionsList.setAttribute("id"   , id);

	let groupID = id.slice(0, id.indexOf('_'));
	keysOfServerResponse.forEach((element) => {
		if(element != groupID) {
			let moveToButton = document.createElement("button");
			moveToButton.setAttribute("class", "moveTo" + element);
			moveToButton.setAttribute("id"   , id);
			moveToButton.innerHTML = objectServerResponse[element][0];
			containerForNestedActionsList.insertAdjacentElement(
				"beforeend", moveToButton);
		}
	});

	let moveToButton = document.querySelector(".actionMoveTo#" + id);
	let clientMenuPosition = moveToButton.getBoundingClientRect();

	let mainArea = document.querySelector(".mainArea");
	if(document.querySelector(".nestedActionsList#" + id) == null) {
		containerForNestedActionsList.style.left = clientMenuPosition.left  + 
																				 			 clientMenuPosition.width + "px";
		containerForNestedActionsList.style.top  = clientMenuPosition.top   + "px";
		mainArea.insertAdjacentElement("beforeend", containerForNestedActionsList);
	}
}

/* ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== */
















