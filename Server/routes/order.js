const router = require("express").Router();
const { AuthenticateUser, AuthenticateShop } = require("../middleware/auth");
const {
  CreateOrder,
  GetAllOrders,
  GetAllOrdersForSeller,
  UpdateOrderStatus,
} = require("../controllers/order.controllers");

router.post("/create-order", AuthenticateUser, CreateOrder);

router.get("/get-all-orders", AuthenticateUser, GetAllOrders);

router.get("/get-all-orders-seller", AuthenticateShop, GetAllOrdersForSeller);

router.put("/update-order-status/:id", AuthenticateShop, UpdateOrderStatus);
module.exports = router;
