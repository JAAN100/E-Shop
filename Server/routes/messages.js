const router = require("express").Router();
const { uploadImageMulter } = require("../middleware/multer");
const { uploadImagesForChat } = require("../controllers/imageRoutes");
const {
  CreateNewMessages,
  GetAllMessages,
} = require("../controllers/messages.controllers");
router.post(
  "/create-new-message",
  uploadImageMulter.array("images"),
  uploadImagesForChat,
  CreateNewMessages,
);

router.get("/get-all-messages/:conversationId", GetAllMessages);

module.exports = router;
