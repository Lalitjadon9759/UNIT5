const express = require("express");
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
} = require("../controllers/ticketController");

const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

const router = express.Router();

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.post("/", dataCheckMiddleware, createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.patch("/:id/resolve", resolveTicket);

module.exports = router;
