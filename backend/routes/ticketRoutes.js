const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

//Re-route into note router
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
//admin side
router.route("/allTickets").get(protect, getAllTickets);
router.route("/allCount").get(allCount);
router.route("/unassignedCount").get(unassignedCount);
router.route("/overDueCount").get(overDueCount);
router.route("/dueTodayCount").get(dueTodayCount);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
