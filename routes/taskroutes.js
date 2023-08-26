const express =require("express");
const { newtask ,tasksofoneuse, updatetask, deletetask} = require("../controllers/taskcontroller");
const isAuthentic = require("../middleware/authentication");

const router = express.Router();


router.post("/new",isAuthentic,newtask);


router.get("/my",isAuthentic,tasksofoneuse);


router.route("/:id")
.put(isAuthentic,updatetask)
.delete(isAuthentic,deletetask);

module.exports=router; 