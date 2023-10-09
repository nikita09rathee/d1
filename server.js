const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const {authenticate}=require("./middleware/authenticate")
const {connection}=require("./config/db");
const {UserModel}=require("./model/user.model");
const {todoController}=require("./controller/todo.controller");
const { authticate } = require("./middleware/authenticate");
const cors=require("cors");
app.use(express.json());
app.use(cors({
      origin:"*"
}))
//login signup 
app.post("/signup",async(req,res)=>{
const {email,password}=req.body;
try{
      bcrypt.hash(password, 4,async function(err, hash) {
            // Store hash in your password DB.
            await UserModel.create({email,password:hash});
            res.send({message:"signup successfull"});

        });
    
}
catch(error){
      console.log(error);
}

});
//login
app.post("/login",async(req,res)=>{
      const {email,password}=req.body;
      const user=await UserModel.findOne({email});
      if(!user){
            res.send({message:"signup first"});
      }
      const hashed_pass=user?.password;
      //console.log(hashed_pass);
      bcrypt.compare(password, hashed_pass, function(err, result) {
            // result == true
            if(err){
                  res.send({message:"login faild"})
            }
            else if(result){
                  const token = jwt.sign({ userId: user._id }, 'masai');
                  res.send({message:"login successfull",token:token}).status(200);
            }
        });
        

});
//authticate user should only see todos
app.use(authenticate);

app.use("/todos",todoController);
app.listen(8080,async()=>{
      try{
            await connection;
            console.log("db connected");
      }
      catch(error){
            console.log(error);
      }
})