const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");   // <-- ADD THIS

const app = express();
app.use(express.json());
app.use(cors());

// Always use absolute path
const TASK_FILE = path.join(__dirname, "tasks.json");

app.get("/api/tasks", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(TASK_FILE));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Unable to read tasks" });
    }
});

app.post("/api/tasks", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(TASK_FILE));
        data.push(req.body.task);
        fs.writeFileSync(TASK_FILE, JSON.stringify(data));
        res.json({ message: "Task added" });
    } catch (err) {
        res.status(500).json({ error: "Unable to write tasks" });
    }
});

app.listen(3000, () => console.log("API running on port 3000"));
