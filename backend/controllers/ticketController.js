const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@desc     get user tickets
//@route   GET /api/tickets/
// @access  private
const getTickets = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//for admin
//@desc     get all tickets
//@route   GET /api/tickets/allTickets
// @access  private
const getAllTickets = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({});
  res.status(200).json(tickets);
});

//@desc     get user ticket
//@route   GET /api/tickets/:id
// @access  private
const getTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

//@desc     delete user ticket
//@route   DELETE /api/tickets/:id
// @access  private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Ticket.remove();

  res.status(200).json({ success: true });
});

//@desc     update user ticket
//@route   PUT /api/tickets/:id
// @access  private
const updateTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});

//@desc     create new ticket
//@route    POST/api/tickets/
// @access  private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  var due_date = new Date();
  due_date.setDate(due_date.getDate() + 7);
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
    dueDate: due_date,
  });

  res.status(201).json(ticket);
});

//@desc     get all tickets count
//@route   GET /api/tickets/allCount
// @access  private
const allCount = asyncHandler(async (req, res) => {
  const countAll = await Ticket.countDocuments({});
  res.status(200).json({ type: "all", count: countAll });
});

//@desc     get overdue tickets count
//@route   GET /api/tickets/overdueCount
// @access  private
const overDueCount = asyncHandler(async (req, res) => {
  var current_date = new Date();
  current_date.setDate(current_date.getDate());
  const tickets = await Ticket.countDocuments({
    dueDate: {
      // $gte: current_date,
      $lt: current_date,
    },
  }).exec((err, docs) => {
    if (err) {
      console.log(err);
      throw new Error("Overdue Count not found");
    }
    res.status(200).json({ type: "overDue", count: docs });
  });
});

//@desc     get unassigned tickets count
//@route   GET /api/tickets/unassigned
// @access  private
const unassignedCount = asyncHandler(async (req, res) => {
  const ticketsUnassigned = await Ticket.countDocuments({
    assignedTo: "unassigned",
  });
  res.status(200).json({ type: "unassigned", count: ticketsUnassigned });
});

//@desc     get dueToday tickets count
//@route   GET /api/tickets/dueToday
// @access  private
const dueTodayCount = asyncHandler(async (req, res) => {
  var current_date = new Date();
  var prev_date = new Date();

  current_date.setDate(current_date.getDate());
  prev_date.setDate(prev_date.getDate() - 1);
  const tickets = await Ticket.countDocuments({
    dueDate: {
      $gte: prev_date,
      $lt: current_date,
    },
  });
  res.status(200).json({ type: "dueToday", count: tickets });
});

module.exports = {
  getTickets,
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  allCount,
  unassignedCount,
  overDueCount,
  dueTodayCount,
};
