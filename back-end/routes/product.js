const router = require('express').Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

const {
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
  verifyToken,
} = require('./verifyToken.js');

// Create
router.post('/create', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE info Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Product by ID
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET All Products
router.get('/', async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  console.log('req.query', req.query);
  const { category, author } = req.query;
  let query = {};
  if (category) {
    query = {
      categories: category,
    };
  }
  if (author) {
    query = {
      ...query,
      author,
    };
  }
  try {
    let products;
    // if (queryNew) {
    //   products = await Product.find().sort({ createdAt: -1 }).limit(5);
    // } else if (queryCategory) {
    //   products = await Product.find({
    //     categories: {
    //       $in: [queryCategory],
    //     },
    //   });
    // } else {
    //   products = await Product.find();
    // }
    products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Product Recommend
router.get('/recommend', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    const listCategory = orders
      .map((order) => order.products)
      .map((product) => product.map((item) => item.categories))
      .flat();
    let listBookBought = orders
      .map((order) => order.products)
      .map((product) =>
        product.map((item) => {
          return {
            title: item.title,
            categories: item.categories,
          };
        })
      )
      .flat();
    const counts = {};
    listCategory.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const sorted = Object.keys(counts)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = counts[key];

        return accumulator;
      }, {});
    const recommendCategory = Object.keys(sorted)[0];
    listBookBought = listBookBought.filter(item => item.categories === recommendCategory).map(item => item.title);
    const product = await (
      await Product.find({ categories: recommendCategory })
    ).filter((product) => !listBookBought.includes(product.title));
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
