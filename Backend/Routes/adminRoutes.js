const express = require("express");
const adminControllers=require("../Controllers/adminControllers")
const { authenticate } = require("../Middlewares/authMiddlewares");
const router=express.Router();
router.get("/",authenticate,adminControllers.getAdminPage);
router.put("/users/:id/role", authenticate, adminControllers.updateRole);

module.exports = router; 