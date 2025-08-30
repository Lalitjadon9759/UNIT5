const express = require("express");
const logger = require("./eventLogger");
const delayMessage = require("./delay");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});


app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Please provide a message query param." });
  }

  logger.emit("log", message);

  res.json({
    status: "success",
    message: `Log event emitted with message: "${message}"`,
  });
});


app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res.status(400).json({ error: "Please provide message and time query params." });
  }

  const delayTime = parseInt(time, 10);
  if (isNaN(delayTime)) {
    return res.status(400).json({ error: "Time must be a number in milliseconds." });
  }

  const result = await delayMessage(message, delayTime);

  res.json({
    status: "success",
    delayedMessage: result,
    delay: `${delayTime}ms`,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
