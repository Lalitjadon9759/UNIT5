const { readData, writeData } = require("../models/todoModel");

let nextId = 3; // since we already have 2 todos in db.json

// Get all todos
function getTodos(req, res) {
  const data = readData();
  res.json(data.todos);
}

// Add a todo
function addTodo(req, res) {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const data = readData();
  const newTodo = { id: nextId++, title, completed };
  data.todos.push(newTodo);
  writeData(data);

  res.status(201).json(newTodo);
}

// Search todos (case-insensitive, partial match)
function searchTodos(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const data = readData();
  const results = data.todos.filter(todo =>
    todo.title.toLowerCase().includes(q.toLowerCase())
  );

  res.json(results);
}

// Update todo by ID
function updateTodo(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;

  const data = readData();
  const todo = data.todos.find(t => t.id == id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  writeData(data);
  res.json(todo);
}

// Delete todo by ID
function deleteTodo(req, res) {
  const { id } = req.params;
  const data = readData();

  const index = data.todos.findIndex(t => t.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = data.todos.splice(index, 1);
  writeData(data);

  res.json({ message: "Todo deleted", deleted });
}

module.exports = {
  getTodos,
  addTodo,
  searchTodos,
  updateTodo,
  deleteTodo
};
