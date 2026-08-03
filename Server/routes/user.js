const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const uploadImage = require("../controllers/imageRoutes");
const { createUser , LoginUser } = require("../controllers/user");

router.post("/sign-up", uploadImageMulter.single("image"), uploadImage, createUser);

router.post("/log-in" , LoginUser);

module.exports = router;
