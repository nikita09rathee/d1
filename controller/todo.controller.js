const express=require("express");
const todoController=express.Router();
const {TodoModel}=require("../model/todo.model");
todoController.get("/",async(req,res)=>{
      const userId=req.userId;
      const {taskname,status,tag}=req.query;
      const filter={};

      if(taskname){
            filter.taskname=taskname;
      }
      if(status){
            filter.status=status;
      }
      if(tag){
            filter.tag=tag;
      }
      filter.userId=userId;
      console.log(userId);

      
        const todos=await TodoModel.find(filter);
        res.send({"todos":todos});
     
});
//post request
todoController.post("/create",async(req,res)=>{
      const {taskname,status,tag}=req.body;
      console.log(req.body);
      const userId=req.userId;
      console.log(userId);

      await TodoModel.create({taskname,status,tag,userId});
        res.send({message:"your todo is created"});
     
});
// request
todoController.get("/:todoId",async(req,res)=>{
      const {todoId}=req.params;
      const userId=req.userId;
      console.log(userId);
      try{
        const todos=await TodoModel.find({userId:userId,_id:todoId});
        res.send({"todos":todos});
      }
      catch(error){
            console.log(error);
      }
});
//update
todoController.patch("/:todoId",async(req,res)=>{
      const {todoId}=req.params;
      const userId=req.userId;
      const payload=req.body;
      console.log(payload+" "+todoId );
      console.log(userId);
     
      const todo=TodoModel.find({_id:todoId});
      if(todo.userId=userId){
      console.log(todo);
await TodoModel.findByIdAndUpdate(todoId,payload);
res.send({message:"todo updated"});
}
else{
      res.send({message:"you are not allowed to change todo"});

}

});

//delet
todoController.delete("/:todoId",async(req,res)=>{
      const {todoId}=req.params;
      const userId=req.userId;
     // const payload=req.body;
      // console.log(payload+" "+todoId );
      // console.log(userId);
     
      const todo=TodoModel.find({_id:todoId});
      if(todo.userId=userId){
      console.log(todo);
await TodoModel.findByIdAndDelete(todoId);
res.send({message:"todo deleted"});
}
else{
      res.send({message:"you are not allowed to delet todo"});

}
});


module.exports={todoController};