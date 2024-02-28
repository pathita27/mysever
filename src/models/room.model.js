const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    imageroom: String,
    name: String,
    room_number: Number,
    status: { type: String, require: true },
    reviews:[
        { star:{ type: Number, require: true }, comment: String }
    ],

    
},{ timestamps: true } );

module.exports = mongoose.model("Room", roomSchema); 