const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

function readData() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
