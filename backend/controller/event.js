const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary").v2;

// Create event
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);
  if (!shop) {
    return next(new ErrorHandler("Shop Id is invalid!", 400));
  } else {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const productData = req.body;
    productData.images = imagesLinks;
    productData.shop = shop;

    const event = await Event.create(productData);

    res.status(201).json({
      success: true,
      event,
    });
  }
});

// Get all events
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();
  res.status(201).json({
    success: true,
    events,
  });
});

// Get all events of a shop
exports.getAllEventsOfShop = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find({ shopId: req.params.id });
  res.status(201).json({
    success: true,
    events,
  });
});

// Delete event of a shop
exports.deleteEventOfShop = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("Event not found with this id", 404));
  }

  for (let i = 0; i < event.images.length; i++) {
    await cloudinary.uploader.destroy(event.images[i].public_id);
  }

  await event.remove();

  res.status(201).json({
    success: true,
    message: "Event deleted successfully!",
  });
});

// Get all events for admin
exports.getAllEventsForAdmin = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find().sort({
    createdAt: -1,
  });
  res.status(201).json({
    success: true,
    events,
  });
}); 
