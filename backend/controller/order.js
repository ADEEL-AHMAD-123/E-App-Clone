const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

  // Group cart items by shopId
  const shopItemsMap = new Map();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  // Create an order for each shop
  const orders = [];

  for (const [shopId, items] of shopItemsMap) {
    const order = await Order.create({
      cart: items,
      shippingAddress,
      user,
      totalPrice,
      paymentInfo,
    });
    orders.push(order);
  }

  res.status(201).json({
    success: true,
    orders,
  });
});

// Get all orders of user
exports.getAllUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ "user._id": req.params.userId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders of seller
exports.getAllSellerOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Update order status for seller
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 400));
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
    order.paymentInfo.status = "Succeeded";
    const serviceCharge = order.totalPrice * 0.10;
    await updateSellerInfo(order.totalPrice - serviceCharge);
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });

  async function updateSellerInfo(amount) {
    const seller = await Shop.findById(req.seller.id);
    seller.availableBalance = amount;
    await seller.save();
  }
});

// Give a refund (user)
exports.orderRefund = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 400));
  }

  order.status = req.body.status;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
    message: "Order Refund Request successfully!",
  });
});

// Accept the refund (seller)
exports.orderRefundSuccess = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 400));
  }

  order.status = req.body.status;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order Refund successfull!",
  });

  if (req.body.status === "Refund Success") {
    order.cart.forEach(async (o) => {
      await updateOrder(o._id, o.qty);
    });
  }

  async function updateOrder(id, qty) {
    const product = await Product.findById(id);
    product.stock += qty;
    product.sold_out -= qty;
    await product.save({ validateBeforeSave: false });
  }
});

// Get all orders (admin)
exports.getAllOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ deliveredAt: -1, createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
});
