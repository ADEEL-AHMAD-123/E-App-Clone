const express = require("express");
const {
  createWithdrawRequest,
  getAllWithdrawRequests,
  updateWithdrawRequest,
} = require("../controller/withdraw");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Create withdraw request --- only for seller
router.post("/create-withdraw-request", isSeller, createWithdrawRequest);

// Get all withdraws --- admin
router.get("/get-all-withdraw-request", isAuthenticated, isAdmin("Admin"), getAllWithdrawRequests);

// Update withdraw request --- admin
router.put("/update-withdraw-request/:id", isAuthenticated, isAdmin("Admin"), updateWithdrawRequest);

module.exports = router;
