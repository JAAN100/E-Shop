const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const createUser = catchAsyncErrors(async (req, res, next) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const { fullName, email, password, avatar, avatarPublicId } = req.body;
    const user = await User.create({ fullName, email, password: hashedPassword, avatar, avatarPublicId });
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
});

module.exports = {
    createUser
};
