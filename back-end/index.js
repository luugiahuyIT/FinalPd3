const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const authorRoute = require('./routes/author');
const cartRoute = require('./routes/cart');
const stripeRoute = require('./routes/stripe');
const categoryRoute = require('./routes/category');

const cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connect success');
  })
  .catch((error) => {
    console.log('connect fail');
  });

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/author', authorRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/category', categoryRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log('Back end running');
});
