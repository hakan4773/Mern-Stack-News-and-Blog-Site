const express = require("express");
const adminControllers=require("../Controllers/adminControllers")
const { authenticate, authorizeAdmin } = require("../Middlewares/authMiddlewares");
const router=express.Router();
router.get("/",authenticate,adminControllers.getAdminPage);

module.exports = router; 