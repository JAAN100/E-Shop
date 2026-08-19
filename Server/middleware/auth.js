const ErrorHandler  =  require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop")
const AuthenticateUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if(!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

const AuthenticateShop = catchAsyncErrors(async (req, res, next) => {
  const { shop_token } = req.cookies;
  if(!shop_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  
  const decodedData = jwt.verify(shop_token, process.env.JWT_SECRET);
  
  req.shop = await Shop.findById(decodedData.id);
  next();
});

module.exports = {
  AuthenticateUser,
  AuthenticateShop
};
