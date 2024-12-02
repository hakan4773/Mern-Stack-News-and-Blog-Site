const express=require("express")
const authController=require("../Controllers/authController")
const router=express.Router();
router.get("/users",authController.getUsers)
router.post("/logout",authController.logout)
router.post("/register",authController.Register)
router.post("/login",authController.Login)
router.put("/users/:id",authController.UpdateUsers)
router.put("/update-password",authController.UpdatePassword)

router.delete("/users/:id",authController.deleteUsers)

module.exports=router