const express = require("express");
const { getAvailableBooks, borrowBook, returnBook } = require("../controllers/readerController");
const returnCheckMiddleware = require("../middlewares/returnCheckMiddleware");

const router = express.Router();

router.get("/books", getAvailableBooks);
router.post("/borrow/:id", borrowBook);
router.post("/return/:id", returnCheckMiddleware, returnBook);

module.exports = router;
