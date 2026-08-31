const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    cart: {
      type: Array,
      required: [true, "Please enter your cart items"],
    },
    shippingAddress: {
      type: Object,
      required: [true, "Please enter your shipping address"],
    },
    user: {
      type: Object,
      required: [true, "Please enter your user details"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter your total price"],
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      paymentType: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Order = model("Order", orderSchema);

module.exports = Order;
