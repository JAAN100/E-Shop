const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
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
