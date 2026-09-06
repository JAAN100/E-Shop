const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const CreateNewMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationId, senderId, images } = req.body;

    const message = await Messages.create({
      senderId,
      conversationId,
      ...(images && images.length > 0 && { images }),
    });

    return res.status(201).json({ success: true, message });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { CreateNewMessages };
