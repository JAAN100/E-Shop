const route = require("express").Router();
const { AuthenticateShop, AuthenticateUser } = require("../middleware/auth");
const { uploadImageMulter } = require("../middleware/multer");
const { uploadImages } = require("../controllers/imageRoutes");
const {
  CreateProduct,
  GetProducts,
  GetAllProducts,
  DeleteProduct,
  CreateProductReview,
} = require("../controllers/product.controllers");

route.post(
  "/create-product",
  AuthenticateShop,
  uploadImageMulter.array("images"),
  uploadImages,
  CreateProduct,
);

route.get("/get-all-products/:id", GetProducts);

route.get("/get-products", GetAllProducts);

route.delete("/delete-product/:id", AuthenticateShop, DeleteProduct);

route.put("/create-new-review/:orderId", AuthenticateUser, CreateProductReview);

module.exports = route;
