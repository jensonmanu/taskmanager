const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Use absolute path to avoid PM2 issues
const TASK_FILE = path.join(__dirname, "tasks.json");

// GET tasks
app.get("/api/tasks", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(TASK_FILE));
        res.json(data);
    } catch (err) {
        console.error("Error reading tasks:", err);
        res.status(500).json({ error: "Unable to read tasks" });
    }
});

// POST task
app.post("/api/tasks", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(TASK_FILE));
        data.push(req.body.task);
        fs.writeFileSync(TASK_FILE, JSON.stringify(data));
        res.json({ message: "Task added" });
    } catch (err) {
        console.error("Error writing tasks:", err);
        res.status(500).json({ error: "Unable to write tasks" });
    }
});

app.listen(3000, () => console.log("API running on port 3000"));
