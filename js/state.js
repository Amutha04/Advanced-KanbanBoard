const savedTasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

export const state = {
  tasks: savedTasks
};

function saveToLocalStorage() {
  localStorage.setItem("kanbanTasks", JSON.stringify(state.tasks));
}

export function addTask(task) {
  state.tasks.push(task);
  saveToLocalStorage();
}

export function updateTaskStatus(taskId, newStatus) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    saveToLocalStorage();
  }
}