const CoupounsCode = require("../model/coupounCode");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const CreateCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const { codeName, value, minAmount, maxAmount, selectedProducts } =
      req.body;
    const coupounCodeExists = await CoupounsCode.findOne({ codeName });
    if (coupounCodeExists) {
      return next(new ErrorHandler("Coupoun code already exists", 400));
    }

    const shopID = req.shop.id;
    const coupounCode = await CoupounsCode.create({
      selectedProducts,
      codeName,
      value,
      minAmount,
      maxAmount,
      shopID,
    });

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopID = req.shop.id;
    const coupounCodes = await CoupounsCode.find({ shopID });
    res.status(200).json({
      success: true,
      coupounCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const DeleteCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupounCode = await CoupounsCode.findByIdAndDelete(req.params.id);
    if (!coupounCode) {
      return next(new ErrorHandler("Coupoun code not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Coupoun code deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetCoupounCodeByName = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupounCode = await CoupounsCode.findOne({
      codeName: req.params.name,
    });
    if (!coupounCode) {
      return next(new ErrorHandler("Coupoun code not found", 404));
    }
    res.status(200).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  CreateCoupounCode,
  GetCoupounCode,
  DeleteCoupounCode,
  GetCoupounCodeByName,
};
