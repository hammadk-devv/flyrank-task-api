const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

const taskRoutes = require("./routes/tasks");

const app = express();

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;