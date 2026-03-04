import { addTask } from "./state.js";
import { renderBoard } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("taskModal");
  const openBtn = document.getElementById("addTaskBtn");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("taskForm");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo"
    };

    addTask(newTask);
    renderBoard();

    form.reset();
    modal.classList.add("hidden");
  });

  renderBoard();
});