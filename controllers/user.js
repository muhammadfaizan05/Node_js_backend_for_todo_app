const UserSchema = require("../models/user");
const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendcookie = require('../utilities/cookiesender');

// get all users 
const allusers = async (req, res, next) => {
    try {
        console.log(req.query);
        let users = await UserSchema.find({});
        res.json({
            success: "true",
            users
        })
    } catch (error) {
        next(error);
    }

}
exports.allusers = allusers;

// register new user 
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await UserSchema.findOne({ email });
        console.log(user);
        if (user) return next(new Error("User Already Exist"));

        const hashedpassword = await bc.hash(password, 10);

        user = UserSchema.create({ name, email, password: hashedpassword });

        sendcookie(user, res, message = "User Registered Successfully", statuscode = 201);
    } catch (error) {
        next(error);
    }
}
exports.register = register;


// login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email }).select("+password");
        if (!user) return next(new Error("Invalid Credentials"));

        const isMatch = await bc.compare(password, user.password);
        if (!isMatch) return next(new Error("Invalid Credentials"));

        sendcookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error);
    }
}
exports.login = login;


// get user details
const getmydetail = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}
exports.getmydetail = getmydetail


// get user logout
const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV=="Developement"? "lax":"none",
            secure: process.env.NODE_ENV=="Developement"? false : true,
         })
        .json({
            success: true,
            message: "logout hogaya",
        })
}
exports.logout = logout