const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const DB_FILE = "./db.json";

// Helper: read DB
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

// Helper: write DB
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// POST /students → Add new student
app.post("/students", (req, res) => {
  const data = readDB();
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.course || !newStudent.batch) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Auto-increment ID
  newStudent.id = data.students.length
    ? data.students[data.students.length - 1].id + 1
    : 1;

  data.students.push(newStudent);
  writeDB(data);
  res.status(201).json(newStudent);
});

// GET /students → Fetch all students
app.get("/students", (req, res) => {
  const data = readDB();
  if (data.students.length === 0) {
    return res.json({ message: "No students found" });
  }
  res.json(data.students);
});

// GET /students/:id → Fetch student by ID
app.get("/students/:id", (req, res) => {
  const data = readDB();
  const student = data.students.find(s => s.id == req.params.id);

  if (!student) {
    return res.json({ message: "No students found" });
  }
  res.json(student);
});

// PUT /students/:id → Update student record
app.put("/students/:id", (req, res) => {
  const data = readDB();
  const index = data.students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.json({ message: "No students found" });
  }

  data.students[index] = { ...data.students[index], ...req.body };
  writeDB(data);
  res.json(data.students[index]);
});

// DELETE /students/:id → Delete student record
app.delete("/students/:id", (req, res) => {
  const data = readDB();
  const index = data.students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.json({ message: "No students found" });
  }

  const deleted = data.students.splice(index, 1);
  writeDB(data);
  res.json({ message: "Student deleted", student: deleted[0] });
});

// GET /students/search?course=<course> → Filter by course
app.get("/students/search", (req, res) => {
  const { course } = req.query;
  const data = readDB();

  if (!course) {
    return res.status(400).json({ message: "Course query required" });
  }

  const result = data.students.filter(s =>
    s.course.toLowerCase().includes(course.toLowerCase())
  );

  if (result.length === 0) {
    return res.json({ message: "No students found" });
  }

  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
