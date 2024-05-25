const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;

// Create new message
exports.createNewMessage = catchAsyncErrors(async (req, res, next) => {
  const messageData = req.body;

  if (req.body.images) {
    const myCloud = await cloudinary.uploader.upload(req.body.images, {
      folder: "messages",
    });
    messageData.images = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  messageData.conversationId = req.body.conversationId;
  messageData.sender = req.body.sender;
  messageData.text = req.body.text;

  const message = new Messages({
    conversationId: messageData.conversationId,
    text: messageData.text,
    sender: messageData.sender,
    images: messageData.images ? messageData.images : undefined,
  });

  await message.save();

  res.status(201).json({
    success: true,
    message,
  });
});

// Get all messages with conversation id
exports.getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Messages.find({ conversationId: req.params.id });

  res.status(201).json({
    success: true,
    messages,
  });
});
