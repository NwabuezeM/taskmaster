const addTaskButton = document.getElementById("add-task");

addTaskButton.addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, description, deadline, priority }),
  });

  if (response.ok) {
    loadTasks();
  }
});

async function loadTasks() {
  const response = await fetch("http://localhost:5000/api/tasks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tasks = await response.json();
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.textContent = `${task.title} - ${task.priority}`;
    taskList.appendChild(taskItem);
  });
}

// Call loadTasks on page load
loadTasks();
