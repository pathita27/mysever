const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingroomSchema = new Schema({
    name: { type: String, required: true },
    contract: { type: String, required: true },
    email: { type: String, required: true },
    room_number: { type: Number, required: true },
    date: { type: String, required: true }, // เพิ่มฟิลด์วันที่
    startTime: { type: String, required: true },
    endTime: { type: String, required: true } // เปลี่ยนชนิดของ endTime เป็น String
}, { timestamps: true });


module.exports = mongoose.model("Booking", bookingroomSchema);
