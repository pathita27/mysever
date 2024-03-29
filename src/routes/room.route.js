const express = require('express');
const app = express.Router();
const controller = require('../controllers/room.controller')
const auth = require('../middleware/auth')

app.get("/", controller.getRooms);

app.get("/:id", controller.getRoomById);

app.get("/room_number/:room_number", controller.getRoomsByRoomNumber);

app.get("/image/:image", controller.getRoomsByRoomNumber);

app.post("/", controller.createRoom);

app.put("/:id", controller.updateRoom);

app.patch("/:id", controller.appRoomReview);

app.delete("/:id", controller.deleteRoomById); 

module.exports = app; 