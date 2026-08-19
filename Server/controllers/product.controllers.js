const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");

const CreateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      productName,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
    } = req.body;
    const product = await Product.create({
      productName,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      shopID: req.shop._id,
      images,
    });
    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const params = req.params.id;
    const products = await Product.find({ shopID: params });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

module.exports = { CreateProduct, GetProducts };
