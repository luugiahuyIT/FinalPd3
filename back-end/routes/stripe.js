const router = require('express').Router()
require ("dotenv").config()
const stripe = require('stripe')('sk_test_51LBp7RCkXbwpgPlH3I7Pm4i1DCpSzDJNo9Wim9aNigUbIY2bXHCgQboEwxMlX6JUge68A8H6sdhvQYM0qOCkUUpt00f7bA1mmc')
const Order = require('../models/Order');
const {
    verifyToken,
  } = require('./verifyToken.js');
  
router.post('/payment', verifyToken, (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            const order = {
                amount: req.body.amount,
                products: req.body.products,
                address: stripeRes.billing_details.address.country + stripeRes.billing_details.address.city + stripeRes.billing_details.address.line1,
                phoneNumber: req.user.phoneNumber || '012345678',
                status: 'paid'
            }
            const newOrder = new Order(order);
            newOrder.userId = req.user.id;
            try {
              const savedOrder = newOrder.save()
              .then(res=> {

              })
              .catch(err);
            } catch (err) {
            //   res.status(500).json(err);
            }
            res.status(200).json(stripeRes)
        }
    })
})

module.exports = router