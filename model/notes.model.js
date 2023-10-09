const mongoose=require("mongoose");
const notesSchema=mongoose.Schema({
      title:{type:String,required:true},
      id:{type:Number,required:true},
      userId:{type:String,required:true}
      // role:{type:String,
      //        enum:["",""],
      //       default:""}

});
const NoteModel=mongoose.model("note",notesSchema);
module.exports={NoteModel};