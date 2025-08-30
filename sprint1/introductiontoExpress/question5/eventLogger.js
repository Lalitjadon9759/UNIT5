const EventEmitter = require("events");

class Logger extends EventEmitter {}

const logger = new Logger();


logger.on("log", (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
});

module.exports = logger;
