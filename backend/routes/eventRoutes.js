const router = require("express").Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../Controller/eventController");
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, getEvents);
router.post("/", verifyToken, createEvent);
router.patch("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;