const mongoose=require("mongoose");
const ContactSchema=new mongoose.Schema({
name:{type:String,require:true},
email:{type:String,require:true},
message:{type:String,require:true},
createdAt:{
    type:Date,
    default:Date.now
}
})
const Contact = mongoose.model("Contact", ContactSchema);

module.exports=Contact;
