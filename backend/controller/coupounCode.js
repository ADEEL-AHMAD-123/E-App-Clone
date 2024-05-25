const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CoupounCode = require("../model/coupounCode");
const ErrorHandler = require("../utils/ErrorHandler");

// Create coupon code
exports.createCouponCode = catchAsyncErrors(async (req, res, next) => {
  const isCoupounCodeExists = await CoupounCode.find({
    name: req.body.name,
  });

  if (isCoupounCodeExists.length !== 0) {
    return next(new ErrorHandler("Coupon code already exists!", 400));
  }

  const coupounCode = await CoupounCode.create(req.body);

  res.status(201).json({
    success: true,
    coupounCode,
  });
});

// Get all coupons of a shop
exports.getAllCouponsOfShop = catchAsyncErrors(async (req, res, next) => {
  const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
  res.status(201).json({
    success: true,
    couponCodes,
  });
});

// Delete coupon code of a shop
exports.deleteCouponCode = catchAsyncErrors(async (req, res, next) => {
  const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

  if (!couponCode) {
    return next(new ErrorHandler("Coupon code doesn't exist!", 400));
  }
  res.status(201).json({
    success: true,
    message: "Coupon code deleted successfully!",
  });
});

// Get coupon code value by its name
exports.getCouponValueByName = catchAsyncErrors(async (req, res, next) => {
  const couponCode = await CoupounCode.findOne({ name: req.params.name });

  res.status(200).json({
    success: true,
    couponCode,
  });
});
