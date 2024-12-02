const mongoose=require("mongoose");
const Category = require("./Category");
const CommentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comments: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [
        {
          name: { type: String, required: true },
          email: { type: String, required: true },
          comments: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
  });
const BlogSchema=new mongoose.Schema({
title:{type:String,require:true},
content:{type:String,require:true},
category: {type: mongoose.Schema.Types.ObjectId,ref:"Category"},
image:{type:String},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
comments: [CommentSchema],
createdAt:{
    type:Date,
    default:Date.now
}})
const Blog = mongoose.model("Blog", BlogSchema);

module.exports=Blog;
