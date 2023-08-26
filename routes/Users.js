const express =require("express");
const UserSchema= require("../models/user");
const isAuthentic = require("../middleware/authentication");
const { allusers, register, login, getmydetail, logout } = require("../controllers/user");
const router = express.Router();


router.get("/getusers",allusers);

router.post("/new",register);

router.post("/login",login);

router.get("/me",isAuthentic,getmydetail);

router.get("/logout",logout);

module.exports= router;