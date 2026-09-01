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

const GetAllOrders = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id.toString();
  try {
    const orders = await Order.find({
      "user._id": id,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const GetAllOrdersForSeller = catchAsyncErrors(async (req, res, next) => {
  const id = req.shop._id.toString();
  try {
    const allOrders = await Order.find({
      "cart.shopId": id,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      allOrders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const UpdateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    const { orderStatus } = req.body;

    if (orderStatus === "Transfered to delivery partner") {
      for (const item of order.cart) {
        await updateStock(item._id, item.qty);
      }
    }

    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date(Date.now());
      order.paymentInfo.status = "Succeeded";
    }
    order.orderStatus = orderStatus;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

async function updateStock(id, qty) {
  const product = await Product.findById(id);
  if (!product) return;
  product.stock -= qty;
  product.sold_out += qty;
  await product.save({ validateBeforeSave: false });
}

module.exports = {
  CreateOrder,
  GetAllOrders,
  GetAllOrdersForSeller,
  UpdateOrderStatus,
};
