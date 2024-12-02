const express=require("express")
const contactController=require("../Controllers/contactController")
const router=express.Router();

router.post("/",contactController.Contact)
router.get("/",contactController.getContact)


module.exports=router