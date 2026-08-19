const route = require("express").Router();
const {AuthenticateShop} = require("../middleware/auth");
const { uploadImageMulter } = require("../middleware/multer");
const {uploadImages} = require("../controllers/imageRoutes");
const {CreateProduct , GetProducts} = require("../controllers/product.controllers");


route.post("/create-product" , AuthenticateShop , uploadImageMulter.array("images") , uploadImages , CreateProduct);

route.get("/get-all-products/:id" , AuthenticateShop , GetProducts);
module.exports = route;