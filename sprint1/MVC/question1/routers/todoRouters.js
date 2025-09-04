const express = require("express");
const {
  getTodos,
  addTodo,
  searchTodos,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.get("/search", searchTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
