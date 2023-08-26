const jwt = require("jsonwebtoken");
const UserSchema= require('../models/user');

module.exports= async(user,res,message,statuscode=201)=>{    
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite: process.env.NODE_ENV=="Developement"? "lax":"none",
        secure: process.env.NODE_ENV=="Developement"? false : true,
    }).json({
        success:"True",
        message
    })
}
