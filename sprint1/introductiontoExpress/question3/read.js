const fs = require("fs");

function readFileData() {
  try {
    const data = fs.readFileSync("Data.txt", "utf8"); 
    return data;
  } catch (err) {
    return "Error reading file!";
  }
}

module.exports = readFileData;
