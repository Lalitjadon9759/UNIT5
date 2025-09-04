const { readData, writeData } = require("../models/bookModel");
const transactionLogger = require("../middlewares/transactionLogger");

function getAvailableBooks(req, res) {
  const data = readData();
  const available = data.books.filter(b => b.status === "available");
  res.json(available);
}
function borrowBook(req, res) {
  const { id } = req.params;
  const { readerName } = req.body;

  if (!readerName) return res.status(400).json({ error: "Reader name is required" });

  const data = readData();
  const book = data.books.find(b => b.id == id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.status === "borrowed") return res.status(400).json({ error: "Book already borrowed" });

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString();

  writeData(data);
  transactionLogger("borrowed", book, readerName);

  res.json(book);
}

function returnBook(req, res) {
  const { id } = req.params;
  const { readerName } = req.body;

  const data = readData();
  const book = data.books.find(b => b.id == id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.status !== "borrowed") return res.status(400).json({ error: "Book is not borrowed" });
  req.book = book;

  const borrowedBy = book.borrowedBy;
  book.status = "available";
  book.borrowedBy = null;
  book.borrowedDate = null;

  writeData(data);
  transactionLogger("returned", book, borrowedBy);

  res.json(book);
}

module.exports = { getAvailableBooks, borrowBook, returnBook };
