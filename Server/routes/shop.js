const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const { uploadImage } = require("../controllers/imageRoutes");
const { AuthenticateShop } = require("../middleware/auth");
const {
  createShop,
  ActivationShop,
  LoginShop,
  GetShop,
  LogoutShop,
  GetShopWithID,
  UpdateShopAvatar,
  UpdateShopData,
} = require("../controllers/shop.controllers");

router.post(
  "/create-shop",
  uploadImageMulter.single("image"),
  uploadImage,
  createShop,
);

router.post("/activation", ActivationShop);

router.post("/login-shop", LoginShop);

router.get("/get-shop", AuthenticateShop, GetShop);

router.get("/get-shopByID/:id", GetShopWithID);

router.put("/update-shop", AuthenticateShop, UpdateShopData);

router.put(
  "/update-avatar",
  AuthenticateShop,
  uploadImageMulter.single("image"),
  uploadImage,
  UpdateShopAvatar,
);

router.post("/logout-shop", AuthenticateShop, LogoutShop);

module.exports = router;
