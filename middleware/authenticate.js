const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
      const token=req.headers.authorization?.split(" ")[1];
      jwt.verify(token, 'masai', function(err, decoded) {
            //console.log(decoded.foo) // bar
            if(err){
                  return res.send({message:"please login"});
            }
            else{
                  console.log(decoded);
                  req.userId=decoded.userId;
                  next();
            }
          });
}
module.exports={authenticate};