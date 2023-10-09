const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {NoteModel}=require("../model/notes.model")
const notesController=express.Router();
require("dotenv").config();
notesController.get("/",async(req,res)=>{
      const notes=await NoteModel.find();
 res.send({notes});

})
//posst
notesController.post("/create",async(req,res)=>{
const {title,id,userId}=req.body;
try{
await NoteModel.create(req.body);
res.send({message:"note added"});
}
catch(error){
      res.send({message:"note not added"});
}
      
});
//update
notesController.patch("/:_id",async(req,res)=>{
      const {_id}=req.params;
      const payload=req.body;
      const userId=req.body.userId;
     const note= await NoteModel.findOne({_id:_id});
   if(note?.userId==userId){
      await NoteModel.findByIdAndUpdate(_id,payload);
      res.send({message:"updated successfully"})
   }
   else{
      res.send({message:"you are not authorized to update"});
   }

      
})//
//delete
notesController.delete("/delete/:_id",async(req,res)=>{
      const {_id}=req.params;
      // const payload=req.body;
      const userId=req.body.userId;
     const note= await NoteModel.findOne({_id:_id});
   if(note?.userId==userId){
      await NoteModel.findByIdAndDelete(_id);
      res.send({message:"deleted successfully"})
   }
   else{
      res.send({message:"you are not authorized to delete"});
   }
      
})






module.exports={notesController};