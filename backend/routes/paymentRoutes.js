const express = require("express");
const { processPayment, getStripeApiKey } = require("../controller/payment");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();

// Process payment
router.post("/process", catchAsyncErrors(processPayment));

// Get Stripe API key
router.get("/stripeapikey", catchAsyncErrors(getStripeApiKey));

module.exports = router;
