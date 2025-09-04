const express = require("express");
const app = express();

app.get("/users/get", (req, res) => {
  res.status(200).json({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  });
});

app.get("/users/list", (req, res) => {
  res.status(200).json([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Bob Smith", email: "bob@example.com" },
  ]);
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
