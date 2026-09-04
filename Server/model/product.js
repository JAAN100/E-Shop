const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    category: {
      type: String,
      required: [true, "Please select product category"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please Enter your product price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
        },
        productId: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    shop: {
      type: Object,
    },
    shopId: {
      type: String,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);

module.exports = Product;
