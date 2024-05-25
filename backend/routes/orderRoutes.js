const express = require("express");
const {
  createOrder,
  getAllUserOrders,
  getAllSellerOrders,
  updateOrderStatus,
  orderRefund,
  orderRefundSuccess,
  getAllOrdersAdmin,
} = require("../controller/order");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Create new order
router.post("/create-order", catchAsyncErrors(createOrder));

// Get all orders of user
router.get("/get-all-orders/:userId", catchAsyncErrors(getAllUserOrders));

// Get all orders of seller
router.get("/get-seller-all-orders/:shopId", catchAsyncErrors(getAllSellerOrders));

// Update order status for seller
router.put("/update-order-status/:id", isSeller, catchAsyncErrors(updateOrderStatus));

// Give a refund (user)
router.put("/order-refund/:id", catchAsyncErrors(orderRefund));

// Accept the refund (seller)
router.put("/order-refund-success/:id", isSeller, catchAsyncErrors(orderRefundSuccess));

// Get all orders (admin)
router.get("/admin-all-orders", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(getAllOrdersAdmin));

module.exports = router;
