const express = require('express');
const app = express.Router();
const controller = require('../controllers/repair.controller')

app.get("/", controller.getRepair);

app.get("/:id", controller.getRepairById);

app.post("/", controller.createRepair);

app.put("/:id", controller.updateRepair);

app.delete("/:id", controller.deleteRepairById);

module.exports = app; 