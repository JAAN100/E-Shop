const router = require("express").Router();
const { AuthenticateShop, AuthenticateUser } = require("../middleware/auth");
const {
  NewConversation,
  GetAllConversation,
  UpdateLastMessage,
  GetAllConversationForUser,
} = require("../controllers/conversation.controllers");
router.post("/create-conversation", NewConversation);

// get Seller Conversations
router.get("/get-all-conversation", AuthenticateShop, GetAllConversation);

router.get(
  "/get-all-conversation-user",
  AuthenticateUser,
  GetAllConversationForUser,
);

router.put("/update-last-message/:conversationId", UpdateLastMessage);

module.exports = router;
