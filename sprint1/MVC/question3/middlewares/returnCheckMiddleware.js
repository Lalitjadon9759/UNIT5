function returnCheckMiddleware(req, res, next) {
  const book = req.book; // set in controller before middleware
  if (!book.borrowedDate) return res.status(400).json({ error: "Book not borrowed" });

  const borrowedDate = new Date(book.borrowedDate);
  const today = new Date();
  const diffDays = Math.floor((today - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
  }
  next();
}

module.exports = returnCheckMiddleware;
