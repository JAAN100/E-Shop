const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
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

async function LoginUser(req, res , next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
        });
    } catch (error) {
        error = new ErrorHandler(error.message, 500);
        next(error);
    }

}

module.exports = {
    createUser,
    LoginUser
};
