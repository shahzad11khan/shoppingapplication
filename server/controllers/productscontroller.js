// const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
// const Product = require('../models/productsmodel');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './products/images'); // Set the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
//   },
// });

// const upload = multer({ storage: storage });

// // Controller methods

// // Get all products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get a single product by ID
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json({ product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// const createProductWithImage = async (req, res) => {
//   console.log(req.body);
//   const {
//     name,
//     category,
//     description,
//     price,
//     featured,
//     shipping,
//     stock,
//   } = req.body;
//   try {
//     // Check if an image is provided
//     const imagePath = req.file ? req.file.path : null;

//     // Assuming you have a Product model defined
//     const newProduct = new Product({
//       name: name,
//       category: category,
//       description: description,
//       price: price,
//       featured: featured,
//       shipping: shipping,
//       stock: stock,
//       image: imagePath, // Save the image path in the database
//     });

//     const savedProduct = await newProduct.save();

//     // Uncomment the above lines once you have your Product model and database connection
//     res.json({ message: 'Product created successfully', savedProduct }); // Modify as needed
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

  
  

// // Update a product by ID
// const updateProductById = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json({ message: 'Product updated successfully', product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Delete a product by ID
// const deleteProductById = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndRemove(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Remove the associated image file when deleting a product
//     if (product.image) {
//       await fs.unlink(product.image);
//     }

//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   createProductWithImage,
//   updateProductById,
//   deleteProductById,
// };
