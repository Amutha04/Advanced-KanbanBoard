import { state, updateTaskStatus } from "./state.js";

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

  enableDragAndDrop();
}

function createTaskCard(task) {
  const div = document.createElement("div");
  div.classList.add("task-card");
  div.dataset.id = task.id;
  div.draggable = true;

  div.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description}</p>
  `;

  div.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.id);
  });

  return div;
}

function enableDragAndDrop() {
  const columns = document.querySelectorAll(".column");

  columns.forEach(column => {

    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
      e.preventDefault();

      const taskId = e.dataTransfer.getData("text/plain");
      const newStatus = column.dataset.status;

      updateTaskStatus(taskId, newStatus);
      renderBoard();
    });

  });
}