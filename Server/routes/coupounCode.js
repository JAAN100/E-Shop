const router = require("express").Router();
const { AuthenticateShop } = require("../middleware/auth");
const {
  CreateCoupounCode,
  GetCoupounCode,
  DeleteCoupounCode,
  GetCoupounCodeByName,
} = require("../controllers/coupounCode.controllers");

router.post("/create-coupoun-code", AuthenticateShop, CreateCoupounCode);
router.get("/get-coupoun-code", AuthenticateShop, GetCoupounCode);
router.get("/get-coupon-value/:name", GetCoupounCodeByName);
router.delete("/delete-coupoun-code/:id", AuthenticateShop, DeleteCoupounCode);
module.exports = router;
