const express = require('express');
const app = express.Router();
const controller = require('../controllers/bookingroom.controller');
const auth = require("../middleware/auth");

// เพิ่มการเรียกใช้งาน middleware auth เพื่อตรวจสอบการยืนยันตัวตนก่อนเข้าถึงเส้นทางที่ระบุ

//app.use(auth); // เรียกใช้ middleware auth ที่เพิ่มมา

app.get("/", controller.getBooking);

app.get("/:id", controller.getBookingById);

app.get("/name/:name", controller.getBookingByName);

app.post("/", controller.createBooking);

app.put("/:id", controller.updateBooking);

app.delete("/:id", controller.deleteBookingById);

module.exports = app;
