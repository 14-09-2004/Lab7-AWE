const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Allow requests from the React frontend (port 3000) and read JSON bodies
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// In-memory storage (no database needed)
let todos = [
  { id: 1, task: "Learn Express.js", completed: false },
  { id: 2, task: "Build a React frontend", completed: false },
];
let nextId = 3;

const isDuplicate = (task, ignoreId) =>
  todos.some((t) => t.id !== ignoreId && t.task.toLowerCase() === task.toLowerCase());

// GET /todos - list all items
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// POST /todos - create a new item (duplicates are rejected)
app.post("/todos", (req, res) => {
  const task = typeof req.body.task === "string" ? req.body.task.trim() : "";
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  if (isDuplicate(task)) {
    return res.status(409).json({ error: "Task already exists" });
  }
  const todo = { id: nextId++, task, completed: false };
  todos.push(todo);
  res.status(201).json({ message: "Todo created successfully", todo });
});

// PUT /todos/:id - update an item
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const { task, completed } = req.body;
  if (task !== undefined && (typeof task !== "string" || !task.trim())) {
    return res.status(400).json({ error: "Task must be a non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be true or false" });
  }
  if (task !== undefined) {
    if (isDuplicate(task.trim(), id)) {
      return res.status(409).json({ error: "Task already exists" });
    }
    todo.task = task.trim();
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }
  res.status(200).json({ message: "Todo updated successfully", todo });
});

// DELETE /todos/:id - delete an item
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
