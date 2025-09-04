const { readData, writeData } = require("../models/taskModel");

function getNextId(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

function getTasks(req, res) {
  const data = readData();
  res.json(data.tasks);
}

function filterTasks(req, res) {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ message: "Tag is required" });

  const data = readData();
  const filtered = data.tasks.filter(t => t.tag.toLowerCase() === tag.toLowerCase());
  res.json(filtered);
}

function addTask(req, res) {
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = readData();
  const newTask = {
    id: getNextId(data.tasks),
    title,
    description,
    tag,
    priority,
    status
  };

  data.tasks.push(newTask);
  writeData(data);

  res.status(201).json(newTask);
}
function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, tag, priority, status } = req.body;

  const data = readData();
  const task = data.tasks.find(t => t.id == id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (tag !== undefined) task.tag = tag;
  if (priority !== undefined) task.priority = priority;
  if (status !== undefined) task.status = status;

  writeData(data);
  res.json(task);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const data = readData();
  const index = data.tasks.findIndex(t => t.id == id);

  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const deleted = data.tasks.splice(index, 1);
  writeData(data);

  res.json({ message: "Task deleted", deleted });
}

module.exports = { getTasks, filterTasks, addTask, updateTask, deleteTask };
