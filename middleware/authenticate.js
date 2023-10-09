const jwt=require("jsonwebtoken");
require("dotenv").config();

const authenticate=(req,res,next)=>{
   if(!req.headers.authorization){
      res.send("please login first");
   }
   const token=req.headers.authorization.split(" ")[1];
   jwt.verify(token, process.env.secret, function(err, decoded) {
     // console.log(decoded.foo) // bar
      if(err){
      res.send({message:"please login first"});
      }
      else{
            console.log(decoded);
            const userId=decoded.userId;
            req.body.userId=userId;
            next();
      }
    });

}
module.exports={authenticate};