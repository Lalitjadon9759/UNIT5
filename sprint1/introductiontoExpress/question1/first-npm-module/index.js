// index.js

// Import boxen
const boxen = require("boxen");

// Define title and message
const title = "Hurray!!!";
const message = "I am using my first external module!";

// Style 1: Classic (default style)
const classicBox = boxen(message, {
  title: title,
  titleAlignment: "center",
  padding: 1,
  margin: 1,
  borderStyle: "classic",
});

// Style 2: SingleDouble (mixed borders)
const singleDoubleBox = boxen(message, {
  title: title,
  titleAlignment: "center",
  padding: 1,
  margin: 1,
  borderStyle: "singleDouble",
});

// Style 3: Round corners
const roundBox = boxen(message, {
  title: title,
  titleAlignment: "center",
  padding: 1,
  margin: 1,
  borderStyle: "round",
});

// Print all three boxes
console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
