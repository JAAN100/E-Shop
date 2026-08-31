const router = require("express").Router();
const { AuthenticateUser } = require("../middleware/auth");
const {
  CreateOrder,
  GetAllOrders,
} = require("../controllers/order.controllers");

router.post("/create-order", AuthenticateUser, CreateOrder);

router.get("/get-all-orders", AuthenticateUser, GetAllOrders);
module.exports = router;
