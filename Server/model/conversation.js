const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    groupTitle: {
      type: String,
    },
    members: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true },
);

const modelConversation = model("conversation", conversationSchema);

module.exports = modelConversation;
