const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const NewConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupTitle, userId, shopId } = req.body;
    const isConversation = await Conversation.findOne({ groupTitle });
    if (isConversation) {
      const conversation = isConversation;
      return res.status(200).json({
        success: true,
        conversation,
      });
    }
    const conversation = await Conversation.create({
      members: [userId, shopId],
      groupTitle,
    });
    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetAllConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.shop._id.toString()] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const UpdateLastMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { lastMessage, lastMessageId: lastMessageId.toString() },
      { returnDocument: "after" },
    );

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetAllConversationForUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user._id.toString()] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  NewConversation,
  GetAllConversation,
  UpdateLastMessage,
  GetAllConversationForUser,
};
