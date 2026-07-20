const express = require("express");
const router = express.Router();

const tasks = require("../data/tasks");

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET task by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  res.json(task);
});

// POST create a new task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT update a task
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  const { title, done } = req.body;

  if (
    (title !== undefined && title.trim() === "") ||
    (title === undefined && done === undefined)
  ) {
    return res.status(400).json({
      error: "Provide a valid title or done status",
    });
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (done !== undefined) {
    task.done = done;
  }

  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

module.exports = router;