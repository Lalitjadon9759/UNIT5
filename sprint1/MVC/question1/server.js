const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
