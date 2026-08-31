const router = require("express").Router();
const { AuthenticateUser } = require("../middleware/auth");
const { CreateOrder } = require("../controllers/order.controllers");

router.post("/create-order", AuthenticateUser, CreateOrder);

module.exports = router;
