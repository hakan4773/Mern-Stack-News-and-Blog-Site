const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
const fs=require("fs")
const fileUpload = require('express-fileupload');
const methodOverride=require("method-override")
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const session = require('express-session');
const MongoStore = require('connect-mongo');

//call
const pageRoutes =require("./Routes/pageRoutes")
const newsRoutes=require("./Routes/newsRoutes");
const blogRoutes=require("./Routes/blogRoutes");
const categoryRoutes=require("./Routes/categoryRoutes")
const authRoutes=require("./Routes/authRoutes")
const contactRoutes=require("./Routes/contactRoutes")
const adminRoutes=require("./Routes/adminRoutes")
// const commentRoutes=require("./Routes/commentRoutes")
const app=express();
dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/News-db',).then(()=>console.log("Connected"))

//Middlewares
app.use(cors({
    origin: 'http://localhost:3000', // Change to your frontend URL
    credentials: true
  }));
  app.use(session({
    secret: 'my_cat', 
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24 * 365, 
    },
    store:MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/News-db"})

  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());
app.use(express.static("public"))
app.use(methodOverride("_method",{methods:["GET","POST"]}))


app.use("/",pageRoutes)
app.use("/News",newsRoutes)
app.use("/Blog",blogRoutes)
app.use("/categories",categoryRoutes)
app.use("/users",authRoutes)
app.use("/contact",contactRoutes)
// app.use("/comment",commentRoutes)

app.use("/Admin",adminRoutes)



const PORT=5000;
app.listen(PORT,()=>{
console.log(`Server is running on the ${PORT}`)

})