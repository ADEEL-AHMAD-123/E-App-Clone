const express = require("express");
const { isSeller } = require("../middleware/auth");
const {
  createCouponCode,
  getAllCouponsOfShop,
  deleteCouponCode,
  getCouponValueByName,
} = require("../controller/coupounCode");
const router = express.Router();

// Create coupon code
router.post("/create-coupon-code", isSeller, createCouponCode);

// Get all coupons of a shop
router.get("/get-coupon/:id", isSeller, getAllCouponsOfShop);

// Delete coupon code of a shop
router.delete("/delete-coupon/:id", isSeller, deleteCouponCode);

// Get coupon code value by its name
router.get("/get-coupon-value/:name", getCouponValueByName);

module.exports = router;
