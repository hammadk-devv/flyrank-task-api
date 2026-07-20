const express = require("express");

const app = express();

const taskRoutes = require("./routes/tasks");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/tasks", taskRoutes);

module.exports = app;