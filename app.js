const express =require("express");
const User = require("./routes/Users");
const Task =require("./routes/taskroutes");
const  connectodb  = require("./DB/dbconnection");
const bodyParser = require("body-parser");
const {config}= require('dotenv');
const cookieParser = require("cookie-parser");
const { errormessage } = require("./middleware/error");
const cors =require('cors')

config({
    path:"./config/config.env"
})


const app =express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use("/user",User);
app.use("/task",Task);

  // DataBase Connecting function 
  connectodb();


app.get('/',async(req,res)=>{
    res.send("Working Goodly");
})


app.use(errormessage)
// console.log(process.env.run_server +" & "+ process.env.PORT);

const PORT = process.env.PORT || 1032;

app.listen(PORT,()=>{  
    console.log("Server Start at "+PORT+" in "+process.env.NODE_ENV+" mode");
}) 