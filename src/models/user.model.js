const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
});

// เพิ่ม uniqueValidator เพื่อตรวจสอบความเป็นเอกลักษณ์ของ email
userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});

userSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}

userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword);
}

userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires);
}

module.exports = mongoose.model("User", userSchema);
