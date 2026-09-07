const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const CreateNewMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationId, sender, text, images } = req.body;
    const message = await Messages.create({
      senderId: sender,
      conversationId,
      text,
      ...(images && images.length > 0 ? { images } : {}),
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetAllMessages = catchAsyncErrors(async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const messages = await Messages.find({
      conversationId: conversationId.toString(),
    }).sort({
      createdAt: 1,
    });
    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { CreateNewMessages, GetAllMessages };
