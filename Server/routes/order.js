const router = require("express").Router();
const { AuthenticateUser, AuthenticateShop } = require("../middleware/auth");
const {
  CreateOrder,
  GetAllOrders,
  GetAllOrdersForSeller,
  UpdateOrderStatus,
  RefundOrder,
} = require("../controllers/order.controllers");

router.post("/create-order", AuthenticateUser, CreateOrder);

router.get("/get-all-orders", AuthenticateUser, GetAllOrders);

router.get("/get-all-orders-seller", AuthenticateShop, GetAllOrdersForSeller);

router.put("/update-order-status/:id", AuthenticateShop, UpdateOrderStatus);

router.put("/refund-order/:id", AuthenticateUser, RefundOrder);
module.exports = router;
