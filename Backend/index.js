const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
const fs=require("fs")
const bcrypt=require("bcryptjs")
const path=require("path")
const fileUpload = require('express-fileupload');
const methodOverride=require("method-override")
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressValidator=require("express-validator")
//call
const pageRoutes =require("./Routes/pageRoutes")
const newsRoutes=require("./Routes/newsRoutes");
const blogRoutes=require("./Routes/blogRoutes");
const categoryRoutes=require("./Routes/categoryRoutes")
const authRoutes=require("./Routes/authRoutes")
const contactRoutes=require("./Routes/contactRoutes")
const adminRoutes=require("./Routes/adminRoutes")

const app=express();
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


//Middlewares
app.use(cors({
  origin: [ 'http://localhost:3000','https://news-mern-stack-news-and-blog-site.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization","Cookie"]

}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }))




app.use(cookieParser());

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method",{methods:["GET","POST"]}))
app.use(session({
  secret: 'my_cat', 
  resave: false,
  saveUninitialized: false,
  cookie: {
   secure: process.env.NODE_ENV === "production", 
    maxAge: 1000 * 60 * 60 * 24 * 365, 
    sameSite: "none",
  },
  store:MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}));


app.use("/",pageRoutes)
app.use("/News",newsRoutes)
app.use("/Blog",blogRoutes)
app.use("/categories",categoryRoutes)
app.use("/users",authRoutes)
app.use("/contact",contactRoutes)


app.use("/Admin",adminRoutes)




const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`Server is running on the ${PORT}`)

})