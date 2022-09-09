const mongoose = require('mongoose')

const Productchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: String , required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    // inStock: { type: Boolean, default: true },
    status: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = mongoose.model('Product', Productchema)