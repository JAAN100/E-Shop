const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const {sendTokenForSeller} = require("../utils/sendToken");

async function createShop(req, res, next) {
  try {
    const shopExists = await Shop.findOne({ shopEmail : req.body.shopEmail });
    if (shopExists) {
      return next(new ErrorHandler("Error creating shop", 400));
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.shopPassword, salt);
    const {
      shopName,
      shopEmail,
      shopPassword,
      shopAddress,
      phoneNumber,
      zipCode,
      avatar,
      avatarPublicId,
    } = req.body;
    const shop = {
      shopName,
      shopEmail,
      shopPassword: hashedPassword,
      shopAddress,
      phoneNumber,
      zipCode,
      avatar,
      avatarPublicId,
    };
    const activationToken = createActivationToken(shop);
    const activationUrl = `${process.env.FRONT_URL}/activation/${activationToken}`;
    try {
      await sendMail({
        email: shop.shopEmail,
        subject: "Activate your shop",
        message: `Hi ${shop.shopName},
                  Please click on the link to activate your shop:
                  ${activationUrl}
                  Activate Shop`,
      });
      return res.status(201).json({
        success: true,
        message: `Please check your email:- ${shop.shopEmail} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate shop
const ActivationShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newShop = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newShop) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const {
      shopName,
      shopEmail,
      shopPassword,
      shopAddress,
      phoneNumber,
      zipCode,
      avatar,
      avatarPublicId,
    } = newShop;
    let shop = await Shop.findOne({ shopEmail });
    if (shop) {
      return next(new ErrorHandler("Not Found", 400));
    }
    shop = await Shop.create({
      shopName,
      shopEmail,
      shopPassword,
      shopAddress,
      phoneNumber,
      zipCode,
      avatar,
      avatarPublicId,
    });
    sendTokenForSeller(shop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createShop,
  ActivationShop,
};
