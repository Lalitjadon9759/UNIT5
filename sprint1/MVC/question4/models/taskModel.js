const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../tasks.json");

function readData() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
