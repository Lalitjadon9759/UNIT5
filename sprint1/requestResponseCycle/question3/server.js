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
    return { dishes: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.post("/dishes", (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let data = readDB();
  let newDish = {
    id: data.dishes.length ? data.dishes[data.dishes.length - 1].id + 1 : 1,
    name,
    price,
    category,
  };

  data.dishes.push(newDish);
  writeDB(data);

  res.status(201).json(newDish);
});

app.get("/dishes", (req, res) => {
  let data = readDB();
  res.status(200).json(data.dishes);
});

app.get("/dishes/:id", (req, res) => {
  let data = readDB();
  let dish = data.dishes.find((d) => d.id === parseInt(req.params.id));

  if (!dish) {
    return res.status(404).json({ error: "Dish not found" });
  }
  res.status(200).json(dish);
});

app.put("/dishes/:id", (req, res) => {
  let data = readDB();
  let index = data.dishes.findIndex((d) => d.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  data.dishes[index] = { id: parseInt(req.params.id), name, price, category };
  writeDB(data);

  res.status(200).json(data.dishes[index]);
});
app.delete("/dishes/:id", (req, res) => {
  let data = readDB();
  let index = data.dishes.findIndex((d) => d.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  let removed = data.dishes.splice(index, 1);
  writeDB(data);

  res.status(200).json({ message: "Dish deleted", deleted: removed[0] });
});

app.get("/dishes/get", (req, res) => {
  let { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Dish name query is required" });
  }

  let data = readDB();
  let results = data.dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No dishes found" });
  }

  res.status(200).json(results);
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🍽️ Dishes API running at http://localhost:${PORT}`);
});
