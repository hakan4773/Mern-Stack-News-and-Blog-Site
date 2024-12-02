const express=require("express");
const categoryConttroller = require("../Controllers/categoryController");
const router=express.Router();
router.post("/AddCategory",categoryConttroller.createCategory)
router.get("/",categoryConttroller.getCategory)
router.delete("/AddCategory/:id",categoryConttroller.deleteCategory)

module.exports = router; 