const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Password must be at least 4 characters"],
        select: false
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    },
    avatarPublicId: {
        type: String
    }
}, { timestamps: true });

// model(name, schema) — the second argument must be the Schema instance,
// not a string. Passing "user" here was breaking the model entirely.
const USER = model("User", userSchema);

module.exports = USER;
