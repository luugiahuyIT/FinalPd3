const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: String, required: true },
        author: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, default: 'pending' },
    statusPay: { type: String, default: 'not Pay' },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
