const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../model/order");
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

const CreateProductReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": req.body.productId }], new: true },
    );
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    const { rating, comment, productId } = req.body;
    const user = req.user;
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user._id.toString() === user._id.toString(),
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id.toString() === user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
          rev.user = user;
        }
      });
    } else {
      product.reviews.push({
        user,
        rating,
        comment,
        productId,
      });
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  CreateProduct,
  GetProducts,
  DeleteProduct,
  GetAllProducts,
  CreateProductReview,
};
