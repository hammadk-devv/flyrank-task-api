const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Flyrank Task API!");
});

module.exports = app;