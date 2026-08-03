const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createUser = catchAsyncErrors(async (req, res, next) => {
        
    const { fullName, email, password, avatar, avatarPublicId } = req.body;
    const user = await User.create({ fullName, email, password, avatar, avatarPublicId });
    
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
});

module.exports = {
    createUser
};
