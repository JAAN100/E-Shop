const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const { uploadImage } = require("../controllers/imageRoutes");
const {
  createUser,
  LoginUser,
  ActivationUser,
  GetUser,
  LogoutUser,
  UpdateUserInfo,
  UpdateUserPhoto,
  UpdateUserAddress,
  DeleteUserAddress,
  UpdateUserPassword,
} = require("../controllers/user");
const { AuthenticateUser } = require("../middleware/auth");

router.post(
  "/sign-up",
  uploadImageMulter.single("image"),
  uploadImage,
  createUser,
);

router.post("/log-in", LoginUser);

router.post("/activation", ActivationUser);

router.put("/update-user-info", AuthenticateUser, UpdateUserInfo);

router.put(
  "/update-avatar",
  AuthenticateUser,
  uploadImageMulter.single("image"),
  uploadImage,
  UpdateUserPhoto,
);

router.patch("/update-user-address", AuthenticateUser, UpdateUserAddress);

router.get("/get-user", AuthenticateUser, GetUser);

router.delete("/delete-user-address/:id", AuthenticateUser, DeleteUserAddress);

router.put("/change-password", AuthenticateUser, UpdateUserPassword);

router.post("/logout", AuthenticateUser, LogoutUser);

module.exports = router;
