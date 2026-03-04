import { state, deleteTask, updateTaskStatus } from "./state.js";

let currentFilter = "all";
let sortByDate = false;

export function setFilter(value) {
  currentFilter = value;
  renderBoard();
}

export function toggleSort() {
  sortByDate = !sortByDate;
  renderBoard();
}

export function renderBoard() {
  const lists = {
    todo: document.getElementById("todoList"),
    "in-progress": document.getElementById("inProgressList"),
    done: document.getElementById("doneList")
  };

  Object.values(lists).forEach(list => list.innerHTML = "");

  let tasks = [...state.tasks];

  if (currentFilter !== "all") {
    tasks = tasks.filter(t => t.priority === currentFilter);
  }

  if (sortByDate) {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  tasks.forEach(task => {
    const card = createCard(task);
    lists[task.status].appendChild(card);
  });

  enableDrag();
}

function createCard(task) {
  const div = document.createElement("div");
  div.className = "task-card";
  div.draggable = true;

  div.innerHTML = `
    <div class="task-header">
      <h4>${task.title}</h4>
      <div>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">✖</button>
      </div>
    </div>
    <p>${task.description}</p>
    <p>📅 ${task.dueDate}</p>
    <p class="priority ${task.priority}">
      ${task.priority.toUpperCase()}
    </p>
  `;

  div.addEventListener("dragstart", e => {
    e.dataTransfer.setData("id", task.id);
  });

  div.querySelector(".delete-btn").onclick = () => {
    deleteTask(task.id);
    renderBoard();
  };

  div.querySelector(".edit-btn").onclick = () => {
    document.getElementById("modalTitle").innerText = "Edit Task";
    document.getElementById("editTaskId").value = task.id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDueDate").value = task.dueDate;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskModal").classList.remove("hidden");
  };

  return div;
}

function enableDrag() {
  document.querySelectorAll(".column").forEach(column => {
    column.ondragover = e => e.preventDefault();

    column.ondrop = e => {
      const id = e.dataTransfer.getData("id");
      updateTaskStatus(id, column.dataset.status);
      renderBoard();
    };
  });
}