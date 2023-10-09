//routes or controller is same
const {UserModel}=require("../model/signup.model");
const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userController=express.Router();
require("dotenv").config();
userController.post("/signup",async(req,res)=>{
      const{email,password}=req.body;
      bcrypt.hash(password, 4,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                  res.send("something went wong in hash")
            }
            await UserModel.create({email,password:hash});
            res.send({message:"signup successfull"});
        });

     // res.send("fghj")
});
userController.post("/login",async(req,res)=>{
      //res.send("fghj")
      const {email,password}=req.body;
     const user= await UserModel.findOne({email});
      const hash_pass=user?.password;
      bcrypt.compare(password, hash_pass, function(err, result) {
            // result == true
            if(err){
            res.send("password wrong")
            }
            else{
                  const token = jwt.sign({ userId : user._id }, process.env.secret);
                  console.log(token);
                  res.send({message:"login successfull",token:token});
            }
        });
});

module.exports={userController};
