export const state = {
  tasks: []
};

export function addTask(task) {
  state.tasks.push(task);
}