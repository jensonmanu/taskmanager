const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const TASK_FILE = "./tasks.json";

app.get("/api/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync(TASK_FILE));
    res.json(data);
});

app.post("/api/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync(TASK_FILE));
    data.push(req.body.task);
    fs.writeFileSync(TASK_FILE, JSON.stringify(data));
    res.json({ message: "Task added" });
});

app.listen(3000, () => console.log("API running on port 3000"));
