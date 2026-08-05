const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/sendToken");
const createUser = catchAsyncErrors(async (req, res, next) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return next(new ErrorHandler("Wrong credentials", 400));
    }
    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const { fullName, email, password, avatar, avatarPublicId } = req.body;
    // const user = await User.create({ fullName, email, password: hashedPassword, avatar, avatarPublicId });
    // return res.status(201).json({
    //     success: true,
    //     message: "User created successfully",
    //     user,
    // });
    const user = {
        fullName,
        email,
        password: hashedPassword,
        avatar,
        avatarPublicId
    }
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONT_URL}/activation/${activationToken}`;
    try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.fullName}, please click on the link to activate your account: ${activationUrl}`
        });
        return res.status(201).json({
            success: true,
            message: `Please check your email:- ${user.email} to activate your account!`,
        });    
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//Activation Token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
}

//activate user
const ActivationUser = catchAsyncErrors(async (req, res, next) => {
    try {        
        const { activation_token } = req.body;
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if(!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }        
        const { fullName, email, password, avatar, avatarPublicId } = newUser;
        let user = await User.findOne({ email });
        if(user) {
            return next(new ErrorHandler("Not Found", 400));
        }
        user =  await User.create({
            fullName,
            email,
            password,
            avatar,
            avatarPublicId
        });
        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



const LoginUser = catchAsyncErrors(async (req, res, next) =>  {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Wrong credentials",
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Wrong credentials",
            });
        }
        sendToken(user, 200, res);
    } catch (error) {
        error = new ErrorHandler(error.message, 500);
        next(error);
    }
}); 

//load user
async function GetUser(req, res, next) {
    try {
        const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.status(200).json({
        success: true,
        user,
    });
    } catch (error) {
        error = new ErrorHandler(error.message, 500);
        next(error);
    }
}


module.exports = {
    createUser,
    LoginUser,
    ActivationUser,
    GetUser
};
