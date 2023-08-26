const errormessage = (err,req,res,next)=>{
    err.message=err.message || "internal server error"
    return res.status(404).json({
        success:false,
        message:err.message
    })
}
  exports.errormessage=errormessage;