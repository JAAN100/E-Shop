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
      stock,
      shopId: req.shop._id,
      shop: req.shop,
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
    const products = await Product.find({ shopId: params });    
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
});
const DeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { CreateProduct, GetProducts, DeleteProduct , GetAllProducts };
