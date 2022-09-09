const mongoose = require('mongoose')

const Userchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: { type: String }

}, { timestamps: true })

module.exports = mongoose.model('User', Userchema)