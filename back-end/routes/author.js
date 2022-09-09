const router = require('express').Router();
const Author = require('../models/Author');
const {
  verifyToken,
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require('./verifyToken.js');

router.get('/', async (req, res) => {
  try {
    const list = await Author.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newAuthor = new Author(req.body);

  try {
    const savedAuthor = await newAuthor.save();
    res.status(200).json(savedAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
    
        res.status(200).json(updatedAuthor);
      } catch (err) {
        res.status(500).json(err);
      }
  });

// DELETE 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json('Author has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
