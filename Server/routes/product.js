const route = require("express").Router();
const {AuthenticateShop} = require("../middleware/auth");
const { uploadImageMulter } = require("../middleware/multer");
const {uploadImages} = require("../controllers/imageRoutes");
const {CreateProduct , GetProducts , GetAllProducts , DeleteProduct} = require("../controllers/product.controllers");


route.post("/create-product" , AuthenticateShop , uploadImageMulter.array("images") , uploadImages , CreateProduct);

route.get("/get-all-products/:id" , AuthenticateShop , GetProducts);

route.get("/get-products" , GetAllProducts);

route.delete("/delete-product/:id" , AuthenticateShop , DeleteProduct);
module.exports = route;