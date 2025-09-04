const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
