const Order = require("../model/order");
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const CreateOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    //Group Card Items by Shop
    const ShopItems = new Map();
    for (const item of cart) {
      const shopId = item.shopId;
      if (ShopItems.has(shopId)) {
        ShopItems.get(shopId).push(item);
      } else {
        ShopItems.set(shopId, [item]);
      }
    }
    //Create Order for Each Shop
    const orders = [];
    for (const [shopId, items] of ShopItems.entries()) {
      const order = new Order({
        cart: items,
        shippingAddress,
        user,
        totalPrice: items.reduce(
          (acc, item) => acc + item.discountPrice * item.qty,
          0,
        ),
        paymentInfo,
      });
      orders.push(order);
    }
    //Save all orders
    await Promise.all(orders.map((order) => order.save()));
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  CreateOrder,
};
