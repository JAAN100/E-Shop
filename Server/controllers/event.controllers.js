const Event = require("../model/event");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const CreateEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      productName,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      start_Date,
      finish_Date,
      images,
    } = req.body;
    const event = await Event.create({
      productName,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      start_Date,
      finish_Date,
      shopID: req.shop._id,
      shop: req.shop,
      images,
    });
    res.status(201).json({
      success: true,
      event,
      message: "Event created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetEvents = catchAsyncErrors(async (req, res, next) => {
     try {
    const params = req.params.id;
    const events = await Event.find({ shopID: params });
    if (!events) {
      return res.status(404).json({
        success: false,
        message: "Events not found",
      });
    }
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

const DeleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

const GetAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    if (!allEvents) {
      return res.status(404).json({
        success: false,
        message: "Events not found",
      });
    }
    res.status(200).json({
      success: true,
      allEvents,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

module.exports = {
  CreateEvent,
  GetEvents,
  DeleteEvent,
  GetAllEvents
};
