
const sendToken = (user , statuscode , res) =>{
    const token = user.getJWTToken();
    const options = {
        expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    
    const {password : pass , ...rest} = user._doc;    
    res.status  (statuscode).cookie("token" , token , options).json({
        success : true,
        user: rest,
        token
    })
}

const sendTokenForSeller = (shop , statuscode , res) =>{
    const token = shop.getJWTToken();
    const options = {
        expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    
    const {password : pass , ...rest} = shop._doc;    
    res.status  (statuscode).cookie("token" , token , options).json({
        success : true,
        shop: rest,
        token
    })
}
module.exports = {
    sendToken,
    sendTokenForSeller
};