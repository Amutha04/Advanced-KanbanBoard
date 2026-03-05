import { addTask, updateTask, state} from "./state.js";
import { renderBoard, setFilter, toggleSort } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("taskModal");
  const form = document.getElementById("taskForm");

  document.getElementById("addTaskBtn").onclick = () => {
    form.reset();
    document.getElementById("editTaskId").value = "";
    document.getElementById("modalTitle").innerText = "Add New Task";
    modal.classList.remove("hidden");
  };

  document.getElementById("closeModal").onclick = () => {
    modal.classList.add("hidden");
  };

  form.onsubmit = e => {
  e.preventDefault();

  const id = document.getElementById("editTaskId").value;

  let status = "todo";

  if (id) {
    // Preserve status safely from state
    const existingTask = state.tasks.find(t => t.id === id);

    if (existingTask) {
      status = existingTask.status;
    }
  }

  const taskData = {
    id: id || Date.now().toString(),
    title: taskTitle.value,
    description: taskDescription.value,
    dueDate: taskDueDate.value,
    priority: taskPriority.value,
    status
  };

  if (id) {
    updateTask(taskData);
  } else {
    addTask(taskData);
  }

  modal.classList.add("hidden");
  renderBoard();
};
  document.getElementById("filterPriority").onchange = e => {
    setFilter(e.target.value);
  };

  document.getElementById("sortBtn").onclick = () => {
    toggleSort();
  };

  document.getElementById("darkModeToggle").onclick = () => {
    document.body.classList.toggle("dark");
  };

  renderBoard();
});