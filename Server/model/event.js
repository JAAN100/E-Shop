const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    productName:{
        type: String,
        required: [true, "Please enter event product name"],
    },
    description:{
        type: String,
        required: [true, "Please enter event product description"],
    },
    category:{
        type: String,
        required: [true, "Please select event product category"],
    },
    status:{
        type: String,
        default: "running"
    },
    start_Date:{
        type: Date,
        required: [true, "Please select event start date"],
    },
    finish_Date:{
        type: Date,
        required: [true, "Please select event finish date"],
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type:Number,
    },
    discountPrice:{
        type:Number,
        required:[true,"Please Enter your event product price"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter event product stock"],
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
    shop:{
        type: Object,
    },
    sold_out:{
        type:Number,
        default:0
    }
},{timestamps:true});


const Event = model("Event", eventSchema);

module.exports = Event;