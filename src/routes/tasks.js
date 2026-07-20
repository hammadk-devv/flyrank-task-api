const express = require("express");
const router = express.Router();

const tasks = require("../data/tasks");

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET single task by ID
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

module.exports = router;