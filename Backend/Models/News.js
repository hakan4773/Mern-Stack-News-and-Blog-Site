const mongoose=require("mongoose");


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
const NewsSchema=new mongoose.Schema({
title:{type:String,require:true},
subtitle:{type:String,require:true},
content:{type:String,require:true},
category: {type: mongoose.Schema.Types.ObjectId,ref:"Category"},
image:{type:String},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
createdAt:{
    type:Date,
    default:Date.now
},
comments: [CommentSchema],
})//kategori ekle

const News = mongoose.model("News", NewsSchema);

module.exports=News;
