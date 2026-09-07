const { text } = require("express");
const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },

    text: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const modelMessage = model("message", messageSchema);
module.exports = modelMessage;
