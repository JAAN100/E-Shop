const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const uploadImage = require("../controllers/imageRoutes");
const AuthenticateUser = require("../middleware/auth");
const {createShop , ActivationShop} = require("../controllers/shop.controllers");
router.post("/create-shop" , uploadImageMulter.single("image"), uploadImage, createShop);
router.post("/activation" , ActivationShop);

module.exports = router;