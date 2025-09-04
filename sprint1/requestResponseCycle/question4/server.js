const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); 
const dbPath = path.join(__dirname, "db.json");

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return { books: [] };
  }
};


const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let data = readDB();
  let newBook = {
    id: data.books.length ? data.books[data.books.length - 1].id + 1 : 1,
    title,
    author,
    year,
  };

  data.books.push(newBook);
  writeDB(data);

  res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
  let data = readDB();
  res.status(200).json(data.books);
});

app.get("/books/:id", (req, res) => {
  let data = readDB();
  let book = data.books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(book);
});


app.put("/books/:id", (req, res) => {
  let data = readDB();
  let index = data.books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  data.books[index] = { id: parseInt(req.params.id), title, author, year };
  writeDB(data);

  res.status(200).json(data.books[index]);
});


app.delete("/books/:id", (req, res) => {
  let data = readDB();
  let index = data.books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  let removed = data.books.splice(index, 1);
  writeDB(data);

  res.status(200).json({ message: "Book deleted", deleted: removed[0] });
});


app.get("/books/search", (req, res) => {
  let { author, title } = req.query;

  if (!author && !title) {
    return res.status(400).json({ error: "Query parameter 'author' or 'title' is required" });
  }

  let data = readDB();
  let results = data.books;

  if (author) {
    results = results.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    results = results.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json(results);
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📚 Books API running at http://localhost:${PORT}`);
});
