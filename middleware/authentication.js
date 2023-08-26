const UserSchema= require("../models/user");
const jwt = require("jsonwebtoken");

module.exports=async(req,res,next)=>{
    let { token } = req.cookies;
    if(!token)return res.status(403).json({
        success:"False",
        message:"Login First"
       })
       
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await UserSchema.findById(decoded._id); 
    next()
}