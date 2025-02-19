const express=require("express")
const authController=require("../Controllers/authController")
const {body,validationResult}=require("express-validator")
const router=express.Router();
const registerValidation=[
    body("email").isEmail().withMessage("Geçerli bir e-posta adresi giriniz."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Şifre en az 6 karakter olmalı.")
    .matches(/\d/)
    .withMessage("Şifre en az bir rakam içermelidir."),
  body("name").notEmpty().withMessage("İsim alanı boş olamaz."),

    ]
    const validate = (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors.array()); 
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      };
      

router.get("/users",authController.getUsers)
router.post("/logout",authController.logout)
router.post("/register",registerValidation,validate,authController.Register)
router.post("/login",authController.Login)
router.put("/users/:id",authController.UpdateUsers)
router.put("/update-password",authController.UpdatePassword)

router.delete("/users/:id",authController.deleteUsers)

module.exports=router