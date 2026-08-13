const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shopSchema = new Schema({
    shopName: {
        type: String,
        required: true,
    },
    shopEmail: {
        type: String,
        required: true,
        unique: true
    },
    shopPassword: {
        type: String,
        required: true,
        minLength: [4, "Password must be at least 4 characters"],
        select: false
    },
    description: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    shopAddress: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "seller"
    },
    zipCode: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    },
    avatarPublicId: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, { timestamps: true });

shopSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const SHOP = model("Shop", shopSchema);

module.exports = SHOP;
