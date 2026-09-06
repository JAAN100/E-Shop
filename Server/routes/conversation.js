const router = require("express").Router();
const { AuthenticateShop } = require("../middleware/auth");
const {
  NewConversation,
  GetAllConversation,
} = require("../controllers/conversation.controllers");
router.post("/create-conversation", NewConversation);

// get Seller Conversations
router.get("/get-all-conversation", AuthenticateShop, GetAllConversation);

module.exports = router;
