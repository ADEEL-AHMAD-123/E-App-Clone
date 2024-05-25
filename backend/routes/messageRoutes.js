const express = require("express");
const {
  createNewMessage,
  getAllMessages,
} = require("../controller/message");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();

// Create new message
router.post("/create-new-message", catchAsyncErrors(createNewMessage));

// Get all messages with conversation id
router.get("/get-all-messages/:id", catchAsyncErrors(getAllMessages));

module.exports = router;
