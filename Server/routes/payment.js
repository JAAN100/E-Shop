const router = require("express").Router();
const {
  Payments,
  GetStripeApiKey,
} = require("../controllers/payment.controller");

router.post("/process", Payments);

router.get("/stripeapikey", GetStripeApiKey);

module.exports = router;
