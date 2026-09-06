const router = require("express").Router();
const { uploadImageMulter } = require("../middleware/multer");
const { uploadImages } = require("../controllers/imageRoutes");
const { CreateNewMessages } = require("../controllers/messages.controllers");
router.post(
  "/create-new-message",
  uploadImageMulter.array("images"),
  uploadImages,
  CreateNewMessages,
);

module.exports = router;
