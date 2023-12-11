const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Product = require('../models/productsmodel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './products/images'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
  },
});

const upload = multer({ storage: storage });

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json( product );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a product with image
router.post('/products', upload.single('productImage'), async (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);

  const {
    name,
    category,
    description,
    price,
    featured,
    shipping,
    stock,
    company
  } = req.body;
  try {
    // Check if an image is provided
    const imagePath = req.file ? req.file.filename : null;

    // Assuming you have a Product model defined
    const newProduct = new Product({
      name: name,
      category: category,
      description: description,
      price: price,
      featured: featured,
      shipping: shipping,
      stock: stock,
      company,company,
      image: imagePath, // Save the image path in the database
    });

    const savedProduct = await newProduct.save();

    res.json({ message: 'Product created successfully', savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/products/:id', upload.single('productImage'), async (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  const {
    name,
    category,
    description,
    price,
    featured,
    shipping,
    stock,
  } = req.body;

  try {
    const imagePath = req.file ? req.file.filename : undefined;

    const product = await Product.findByIdAndUpdate(id, {
      name: name,
      category: category,
      description: description,
      price: price,
      featured: featured,
      shipping: shipping,
      stock: stock,
      image: imagePath,
    }, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  console.log(req.params.id)
  const id=req.params.id
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the associated image file when deleting a product
    if (product.image) {
      await fs.unlink(product.image);
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
