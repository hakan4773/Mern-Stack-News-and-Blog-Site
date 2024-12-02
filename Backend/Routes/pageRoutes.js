const express=require("express");
const pageController = require("../Controllers/pageController");
//const { authenticate } = require("../Middlewares/authMiddlewares");
const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
      return next();
    }
    return res.status(401).json({ message: "Erişim reddedildi, oturum açın." });
  };


const router=express.Router();
router.get("/",isAuthenticated,pageController.getIndexPage)
module.exports = router; 
