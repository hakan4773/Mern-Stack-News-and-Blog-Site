const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
name:{type:String,require:true},
email:{type:String,require:true,unique:true},
password:{type:String,require:true},
gender:{type:String},
number:{type:String},
Address:{type:String},
image:{type:String},
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
role:{
    type:String,
enum:["user", "author", "admin"],
default: "user"
},
news:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"News"
}],
blog:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
}],
createdAt:{
    type:Date,
    default:Date.now
}
})
const User = mongoose.model("User", UserSchema);

module.exports=User;
