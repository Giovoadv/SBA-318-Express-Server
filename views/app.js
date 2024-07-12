const darkMode = document.querySelector(".darkMode");
const formList = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

async function getData() {
  const url = "/api/tasks";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const tasks = await response.json();
    console.log(tasks);

    tasks.forEach((t) => {
      createTaskElements(t);
    });
  } catch (error) {
    console.error(error.message);
  }
}

getData();

// ------------------------- Back-end Actions ---------------------------- //

async function addTask(description) {
  const url = "/api/tasks";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function removeTask(task_id) {
  const url = "/api/tasks/";
  try {
    const response = await fetch(url + task_id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function toggleTask(taskID, completed) {
  const url = "/api/tasks/";
  try {
    const response = await fetch(url + taskID, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function editTask(taskID, description) {
  const url = "/api/tasks/";
  try {
    const response = await fetch(url + taskID, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// --------------------------HTML Elements--------------------------- //

const createTaskElements = (res) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");

  const taskLabel = document.createElement("label");
  taskLabel.textContent = res.description;
  taskLabel.setAttribute("data-taskID", res.task_id);
  if (res.completed) {
    taskLabel.classList.add("strikethrough");
  }

  taskDiv.appendChild(taskLabel);

  taskLabel.addEventListener("click", async (e) => {
    const taskID = taskLabel.dataset.taskid;
    const completed = e.target.classList.contains("strikethrough");
    const res = await toggleTask(taskID, !completed);
    if (!res.error) {
      e.target.classList.toggle("strikethrough");
    } else {
      // Handle error
    }
  });

  // CREATING EDIT AND REMOVE BUTTONS!
  const divButtons = document.createElement("div");
  divButtons.classList.add("divButtons");
  const editButton = document.createElement("button");
  editButton.setAttribute("id", "editButton");
  editButton.setAttribute("data-taskID", res.task_id);
  editButton.style.background = "lightblue";
  editButton.textContent = "Edit";

  const removeButton = document.createElement("button");
  removeButton.setAttribute("data-taskID", res.task_id);
  removeButton.classList.add("removeButton");
  removeButton.style.background = "tomato";
  removeButton.textContent = "Remove";

  divButtons.appendChild(editButton);
  divButtons.appendChild(removeButton);

  taskDiv.appendChild(divButtons);
  taskList.appendChild(taskDiv);

  taskInput.value = "";

  //EDIT AND REMOVE BUTTONS EVENTS

  editButton.addEventListener("click", async () => {
    if (editButton.textContent.toLocaleLowerCase() === "edit") {
      const editInput = document.createElement("input");
      editInput.setAttribute("id", "edit_input");
      editInput.value = taskLabel.textContent;
      taskDiv.prepend(editInput);

      editButton.textContent = "Save";
      taskLabel.classList.add("hidden");
    } else {

      const taskID = editButton.dataset.taskid;
      const newValue = document.getElementById("edit_input").value;
      const res = await editTask(taskID, newValue);
      
      if (!res.error) {
        editButton.textContent = "Edit";
        taskLabel.classList.remove("hidden");
        taskLabel.textContent = newValue;
        document.getElementById("edit_input").remove();
      } else {
        // Handle error
      }
    }
  });

  removeButton.addEventListener("click", async () => {
    const taskID = removeButton.dataset.taskid;
    const res = await removeTask(taskID);
    if (!res.error) {
      taskDiv.remove();
    } else {
      // Handle error
    }
  });
};

// ----------------------------------------------------- //

//DARK AND LIGHT MODE FUNCTION
const darkModeButton = (e) => {
  let element = document.body;
  element.classList.toggle("darkMode");

  if (e.target.textContent === "Dark Mode") {
    e.target.textContent = "Light Mode";
    const taskTitle = document.querySelector("h1");
    taskTitle.style.color = "white";
    const saveFormTitle = document.querySelector("h2");
    saveFormTitle.style.color = "white";
    const formContainer = document.querySelector(".save-task-form");
    formContainer.style.background = "gray";
    return;
  }
  e.target.textContent = "Dark Mode";
  const taskTitle = document.querySelector("h1");
  taskTitle.style.color = "black";
  const saveFormTitle = document.querySelector("h2");
  saveFormTitle.style.color = "black";
  const formContainer = document.querySelector(".save-task-form");
  formContainer.style.background = "rgb(168, 204, 221)";
};
darkMode.addEventListener("click", darkModeButton);

//ADDING TASK FUNCTION
const addingTask = async (e) => {
  e?.preventDefault();
  const inputText = taskInput.value.trim();

  if (inputText === "") {
    window.alert("Please write a task");
    return;
  }

  const res = await addTask(inputText);
  if (!res.error) {
    createTaskElements(res);
  } else {
    // TODO: Handle error
  }
};
formList.addEventListener("submit", addingTask);

const completedTasks = document.querySelector("#completedTaskButton");
completedTasks.style.background = "tomato";

//REMOVING COMPlETED TASK (parentNode)
const completedTask = () => {
  const list = document.querySelectorAll("label.strikethrough");
  list.forEach((label) => {
    label.parentNode.remove();
  });
};
completedTasks.addEventListener("click", completedTask);

/*/FORM VALIDATION
const saveForm = document.querySelector(".save-task-form");
const inputname = saveForm.elements["name"];
const inputLastName = saveForm.elements["lastName"];
const inputEmail = saveForm.elements["email"];

const validate = (e) => {
  e.preventDefault();
  if (
    inputname.value === "" ||
    inputLastName.value === "" ||
    inputEmail.value === ""
  ) {
    window.alert("Please fill all the fields");
    return;
  }

  const user = {
    name: inputname.value,
    lastName: inputLastName.value,
    email: inputEmail.value,
  };

  window.alert("Tasks Successfully Save ");
};

saveForm.addEventListener("submit", validate);*/
