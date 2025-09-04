const { readData, writeData } = require("../models/bookModel");

function getNextId(books) {
  return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
}
function addBook(req, res) {
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = readData();
  const newBook = {
    id: getNextId(data.books),
    title,
    author,
    genre,
    publishedYear,
    status: "available",
    borrowedBy: null,
    borrowedDate: null
  };

  data.books.push(newBook);
  writeData(data);

  res.status(201).json(newBook);
}
function getBooks(req, res) {
  const data = readData();
  res.json(data.books);
}

function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;
  const data = readData();

  const book = data.books.find(b => b.id == id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (genre !== undefined) book.genre = genre;
  if (publishedYear !== undefined) book.publishedYear = publishedYear;

  writeData(data);
  res.json(book);
}

function deleteBook(req, res) {
  const { id } = req.params;
  const data = readData();
  const index = data.books.findIndex(b => b.id == id);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = data.books.splice(index, 1);
  writeData(data);

  res.json({ message: "Book deleted", deleted });
}

module.exports = { addBook, getBooks, updateBook, deleteBook };
