function transactionLogger(action, book, readerName) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${readerName} ${action} "${book.title}"`
  );
}

module.exports = transactionLogger;
