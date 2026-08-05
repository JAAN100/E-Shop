const express = require("express");
const router = express.Router();
const { uploadImageMulter } = require("../middleware/multer");
const uploadImage = require("../controllers/imageRoutes");
const { createUser , LoginUser , ActivationUser , GetUser} = require("../controllers/user");
const AuthenticateUser = require("../middleware/auth");

router.post("/sign-up", uploadImageMulter.single("image"), uploadImage, createUser);

router.post("/log-in" ,LoginUser);

router.post("/activation" , ActivationUser);

router.get("/get-user" , AuthenticateUser , GetUser);
module.exports = router;
