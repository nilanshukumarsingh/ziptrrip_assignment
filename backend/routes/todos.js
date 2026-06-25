const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "todos.json");

function getTodos() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Get all todos
router.get("/", (req, res) => {
  try {
    res.json(getTodos());
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get single todo
router.get("/:id", (req, res) => {
  try {
    const list = getTodos();
    const item = list.find((t) => t.id === Number(req.params.id));
    if (!item) return res.status(404).json({ msg: "not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create todo
router.post("/", (req, res) => {
  try {
    const list = getTodos();
    const item = {
      id: Date.now(),
      title: req.body.title,
      description: req.body.description || "",
      done: false,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    save(list);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update todo
router.put("/:id", (req, res) => {
  try {
    const list = getTodos();
    const idx = list.findIndex((t) => t.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ msg: "not found" });
    list[idx] = { ...list[idx], ...req.body };
    save(list);
    res.json(list[idx]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete todo
router.delete("/:id", (req, res) => {
  try {
    let list = getTodos();
    list = list.filter((t) => t.id !== Number(req.params.id));
    save(list);
    res.json({ msg: "deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
