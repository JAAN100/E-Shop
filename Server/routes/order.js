const router = require("express").Router();
const { AuthenticateUser, AuthenticateShop } = require("../middleware/auth");
const {
  CreateOrder,
  GetAllOrders,
  GetAllOrdersForSeller,
  UpdateOrderStatus,
  RefundOrder,
  RefundOrderSuccess,
} = require("../controllers/order.controllers");

router.post("/create-order", AuthenticateUser, CreateOrder);

router.get("/get-all-orders", AuthenticateUser, GetAllOrders);

router.get("/get-all-orders-seller", AuthenticateShop, GetAllOrdersForSeller);

router.put("/update-order-status/:id", AuthenticateShop, UpdateOrderStatus);

router.put("/refund-order/:id", AuthenticateUser, RefundOrder);

router.put("/refund-order-status/:id", AuthenticateShop, RefundOrderSuccess);

module.exports = router;
