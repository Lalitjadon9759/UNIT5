const express = require("express");
const { addBook, getBooks, updateBook, deleteBook } = require("../controllers/adminController");

const router = express.Router();

router.post("/books", addBook);
router.get("/books", getBooks);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
