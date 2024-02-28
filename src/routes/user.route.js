const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

// เรียกใช้ userController.register สำหรับเส้นทาง /register และ userController.login สำหรับเส้นทาง /login
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
