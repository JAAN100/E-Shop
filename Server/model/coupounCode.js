const {Schema , model} = require("mongoose");


const coupounCodeSchema = new Schema({
    codeName:{
        type: String,
        required: [true, "Please enter coupoun code name"],
        unique: true,
    },
    value:{
        type: Number,
        required: [true, "Please enter coupoun code value"],
    },
    minAmount:{
        type: Number,
    },
    maxAmount:{
        type: Number,
    },
    selectedProducts: {
        type: String,
    },
    shopID :{
            type: Schema.Types.ObjectId,
            ref: "Shop"
    },
} , {timestamps: true});


const CoupounCode = model("CoupounCode", coupounCodeSchema);

module.exports = CoupounCode;