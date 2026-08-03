const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const uploadImage = require("../controllers/imageRoutes");
const { createUser } = require("../controllers/user");

router.post("/create-user", uploadImageMulter.single("image"), uploadImage, createUser);

module.exports = router;
