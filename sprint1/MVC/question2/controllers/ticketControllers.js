const { readData, writeData } = require("../models/ticketModel");

// Generate next ticket ID dynamically
function getNextId(tickets) {
  return tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
}

// GET all tickets
function getTickets(req, res) {
  const data = readData();
  res.json(data.tickets);
}

// GET ticket by ID
function getTicketById(req, res) {
  const { id } = req.params;
  const data = readData();
  const ticket = data.tickets.find(t => t.id == id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  res.json(ticket);
}

// POST create ticket
function createTicket(req, res) {
  const { title, description, priority, user } = req.body;
  const data = readData();

  const newTicket = {
    id: getNextId(data.tickets),
    title,
    description,
    priority,
    user,
    status: "pending"
  };

  data.tickets.push(newTicket);
  writeData(data);

  res.status(201).json(newTicket);
}

// PUT update ticket
function updateTicket(req, res) {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  const data = readData();
  const ticket = data.tickets.find(t => t.id == id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (title !== undefined) ticket.title = title;
  if (description !== undefined) ticket.description = description;
  if (priority !== undefined) ticket.priority = priority;

  writeData(data);
  res.json(ticket);
}

// DELETE ticket
function deleteTicket(req, res) {
  const { id } = req.params;
  const data = readData();

  const index = data.tickets.findIndex(t => t.id == id);
  if (index === -1) return res.status(404).json({ message: "Ticket not found" });

  const deleted = data.tickets.splice(index, 1);
  writeData(data);

  res.json({ message: "Ticket deleted", deleted });
}

// PATCH resolve ticket
function resolveTicket(req, res) {
  const { id } = req.params;
  const data = readData();

  const ticket = data.tickets.find(t => t.id == id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (ticket.status === "resolved") {
    return res.json({ message: "Ticket is already resolved" });
  }

  ticket.status = "resolved";
  writeData(data);

  res.json(ticket);
}

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};
