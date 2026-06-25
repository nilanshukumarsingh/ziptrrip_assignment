const express = require("express");
const router = express.Router();
const fs = require("fs");

const FILE = "todos.json";

const readTodos = () => {
  return JSON.parse(fs.readFileSync(FILE));
};

router.get("/", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

module.exports = router;
