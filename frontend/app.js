async function loadTasks() {
    const res = await fetch("http://192.168.1.33/api/tasks");
    const tasks = await res.json();

    document.getElementById("taskList").innerHTML = 
        tasks.map(t => `<li>${t}</li>`).join("");
}

async function addTask() {
    const val = document.getElementById("taskInput").value;

    await fetch("http://192.168.1.33/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: val })
    });

    loadTasks();
}

loadTasks();
