const express = require("express");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const {
  createEvent,
  getAllEvents,
  getAllEventsOfShop,
  deleteEventOfShop,
  getAllEventsForAdmin,
} = require("../controller/event");
const router = express.Router();

// Create event
router.post("/create-event", isSeller, createEvent);

// Get all events
router.get("/get-all-events", getAllEvents);

// Get all events of a shop
router.get("/get-all-events/:id", isSeller, getAllEventsOfShop);

// Delete event of a shop
router.delete("/delete-shop-event/:id", isSeller, deleteEventOfShop);

// Get all events for admin
router.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), getAllEventsForAdmin);

module.exports = router; 
