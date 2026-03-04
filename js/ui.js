import { state } from "./state.js";

export function renderBoard() {
  const todoList = document.getElementById("todoList");
  const inProgressList = document.getElementById("inProgressList");
  const doneList = document.getElementById("doneList");

  // Clear existing UI
  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  doneList.innerHTML = "";

  state.tasks.forEach(task => {
    const card = createTaskCard(task);

    if (task.status === "todo") {
      todoList.appendChild(card);
    } else if (task.status === "in-progress") {
      inProgressList.appendChild(card);
    } else {
      doneList.appendChild(card);
    }
  });
}

function createTaskCard(task) {
  const div = document.createElement("div");
  div.classList.add("task-card");
  div.dataset.id = task.id;

  div.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description}</p>
  `;

  return div;
}