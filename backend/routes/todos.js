const express = require("express");
const router = express.Router();
const fs = require("fs");

const FILE = "todos.json";

const readTodos = () => {
  return JSON.parse(fs.readFileSync(FILE));
};

const saveTodos = (todos) => {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
};

router.get("/", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

router.post("/", (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  res.json(newTodo);
});

module.exports = router;
