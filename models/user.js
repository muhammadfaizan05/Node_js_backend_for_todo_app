const { default: mongoose } = require("mongoose");

const Schema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("Users",Schema);