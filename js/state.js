const savedTasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

export const state = {
  tasks: savedTasks
};

function save() {
  localStorage.setItem("kanbanTasks", JSON.stringify(state.tasks));
}

export function addTask(task) {
  state.tasks.push(task);
  save();
}

export function updateTask(updatedTask) {
  const index = state.tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    state.tasks[index] = updatedTask;
    save();
  }
}

export function deleteTask(taskId) {
  state.tasks = state.tasks.filter(t => t.id !== taskId);
  save();
}

export function updateTaskStatus(taskId, newStatus) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    save();
  }
}