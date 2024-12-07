const User = require("../Models/Auth");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    const same = await bcrypt.compare(password, user.password);
    if (!same) {
      return res.status(200).json({ message: "Hatalı şifre" })
      
    }

    //session
    req.session.user = user;
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.isAuthenticated = true;
    return res.status(200).json({ message: "Giriş başarılı" });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Giriş yapılamadı" });
  }
};
exports.Register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role: "user",
      Address:"",
      number:"",
      image:""
    });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Kayıt başarısız" });
  }
};
exports.getUsers = async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      const Allusers = await User.find().countDocuments()
      const userİnformation =await User.find()
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" ,});
      }
      console.log(user)
      res.json({ user,Allusers ,userİnformation}); // Sadece oturum açmış olan kullanıcıyı döndür
    } else {
      res.json({ user: null }); // Oturum açılmamışsa null döndür
    }
  } catch (error) {
    console.error("Kullanıcı bilgisi alınırken hata:", error);
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
};

exports.logout = (req, res) => {
//session
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Çıkış yapılırken hata oluştu" });
      }
  res.clearCookie('connect.sid');
      return res.status(200).json({ message: "Başarıyla çıkış yapıldı" });


    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.UpdateUsers=async(req,res)=>{
 try {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Oturum bilgisi yok" });
  }  const updatedUser= await User.findByIdAndUpdate(
    req.session.userId,
    {
      name: req.body.name,
      number: req.body.number,
      Address:req.body.Address,
    //  image: imageName ? "/image/" + imageName : news.image, // Use new image or keep old one
    },
    { new: true }
  );
  res.status(200).json({  updatedUser });
 } catch (error) {
  res.status(401).json({ message: "Hata oluştu", error: error.message });

 }
}
exports.deleteUsers = async (
  req,
  res 
) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Kullanıcı başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi", error: error.message });
  }
};
exports.UpdatePassword=async(req,res)=>{
  try {

    const {oldPassword,newPassword}=req.body;
    const userId = req.session.userId;
    console.log("Gelen yeni şifre:", req.body.newPassword);

   const user=await User.findById(userId)
   if (!user) {
    return res.status(401).json({ message: "Oturum bilgisi yok" });
  }  
  const isMatch = await bcrypt.compare(oldPassword, user.password);

if (!isMatch) {
  return res.status(401).json({ message: "Eski şifre yanlış" });
} 

if (!newPassword || newPassword.trim() === "") {
  return res.status(400).json({ message: "Yeni şifre boş olamaz" });
}
const hashedPassword=await bcrypt.hash(newPassword,10)

user.password=hashedPassword;
await user.save();
res.status(200).json({ message: "Şifre başarıyla güncellendi" });


  } catch (error) {
   res.status(401).json({ message: "Hata oluştu", error: error.message });
 
  }
 }

