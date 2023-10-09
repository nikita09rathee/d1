const express=require("express");
const {userController}=require("./controller/user.controller");
const app=express();
const {authenticate}=require("./middleware/authenticate")
const {notesController}=require("./controller/notes.controller")
const {connection}=require("./config/db");
const cors=require("cors");
app.use(express.json());
const PORT=8080;
app.get("/",(req,res)=>{
      res.send("home");
});
app.use(cors({
      origin:"*"
}))
app.use("/user",userController);
app.use(authenticate);
app.use("/notes",notesController);
app.listen(PORT,async()=>{
      try{
            await connection;
            // console.log("server started")
      console.log(`server started at ${PORT}and coonected to db`);

      }
      catch(error){
            console.log(error);
            console.log("coneection fauiled");
      }
})