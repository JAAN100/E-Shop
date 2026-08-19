const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    productName:{
        type: String,
        required: [true, "Please enter product name"],
    },
    description:{
        type: String,
        required: [true, "Please enter product description"],
    },
    category:{
        type: String,
        required: [true, "Please select product category"],
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type:Number,
    },
    discountPrice:{
        type:Number,
        required:[true,"Please Enter your product price"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
    },
    images: [
    {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
    ],
    shopID :{
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    sold_out:{
        type:Number,
        default:0
    }
},{timestamps:true});


const Product = model("Product", productSchema);

module.exports = Product;