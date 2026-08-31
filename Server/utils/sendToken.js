
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
    const shop_token = shop.getJWTToken();
    const options = {
        expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    
    const {shopPassword : pass , ...rest} = shop._doc;    
    res.status  (statuscode).cookie("shop_token" , shop_token , options).json({
        success : true,
        shop: rest,
        shop_token
    })
}
module.exports = {
    sendToken,
    sendTokenForSeller
};