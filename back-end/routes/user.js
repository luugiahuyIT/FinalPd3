const router = require('express').Router();
const User = require('../models/User');
const {
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
  verifyToken,
} = require('./verifyToken.js');
const CryptoJS = require('crypto-js');

// UPDATE info user
router.put('/:id', verifyTokenAndAuthor, async (req, res) => {
  if (req.body.passwod) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE user
router.delete('/:id', verifyTokenAndAuthor, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user by ID
router.get('/find/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password: passwordUser, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET All user
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET stats user
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      // lay ra nhung ngay tao lon hon lastYear
      { $match: { createdAt: { $gte: lastYear } } },

      {
        // lay ra thang trong createdAt va gan vao bien month
        $project: {
          month: { $month: '$createdAt' },
        },
      },

      {
        // group lai thang va dem tong so luong da dki trong thang
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE user
router.post('/create', verifyTokenAndAdmin, async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    // password: req.body.password
    fullname: req.body.fullname ? req.body.fullname : username,
    address: req.body.address ? req.body.address : '',
    phone: req.body.phone ? req.body.phone : '',
    gender: req.body.gender ? req.body.gender : '',
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
