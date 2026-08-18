const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const {uploadImage} = require("../controllers/imageRoutes");
const {AuthenticateShop} = require("../middleware/auth");
const {createShop , ActivationShop , LoginShop , GetShop} = require("../controllers/shop.controllers");

router.post("/create-shop" , uploadImageMulter.single("image"), uploadImage, createShop);

router.post("/activation" , ActivationShop);

router.post("/login-shop" , LoginShop);

router.get("/get-shop" , AuthenticateShop , GetShop)

module.exports = router;