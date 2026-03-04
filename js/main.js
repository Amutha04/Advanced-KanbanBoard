import { addTask } from "./state.js";
import { renderBoard } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

  const addTaskBtn = document.getElementById("addTaskBtn");

  addTaskBtn.addEventListener("click", () => {

    const title = prompt("Enter task title:");
    if (!title) return;

    const description = prompt("Enter task description:");
    if (!description) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo"
    };

    addTask(newTask);
    renderBoard();
  });

  renderBoard();
});