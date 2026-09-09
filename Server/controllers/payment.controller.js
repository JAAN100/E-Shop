const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

let stripe = null;
const getStripe = () => {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY env var is not set");
    }
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

const Payments = catchAsyncErrors(async (req, res, next) => {
  try {
    const myPayment = await getStripe().paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "StoreHub",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
module.exports = { Payments, GetStripeApiKey };
