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
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Tüm yönlendirmeleri React uygulamasına yönlendirin
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
});

console.log('Proje kök dizini:', process.cwd());
console.log('Statik dosya yolu:', path.join(process.cwd(), '../frontend/build'));
mongoose.connect(process.env.MONGO_URI,).then(()=>console.log("Connected"))

//Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://mern-stack-news-and-blog-site.onrender.com'], // Change to your frontend URL
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
    store:MongoStore.create({ mongoUrl: process.env.MONGO_URI})
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



const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`Server is running on the ${PORT}`)

})