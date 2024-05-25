const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const {
  createNewConversation,
  getAllConversationSeller,
  getAllConversationUser,
  updateLastMessage,
} = require("../controller/conversation");
const router = express.Router();

// Create a new conversation
router.post("/create-new-conversation", createNewConversation);

// Get seller conversations
router.get("/get-all-conversation-seller/:id", isSeller, getAllConversationSeller);

// Get user conversations
router.get("/get-all-conversation-user/:id", isAuthenticated, getAllConversationUser);

// Update the last message
router.put("/update-last-message/:id", updateLastMessage);

module.exports = router;
