const express = require('express');
const router = express.Router();
const cartDataschema = require('../models/cartDataSchema');

// Get all products
router.get('/orderditem', async (req, res) => {
    try {
      const orderditem = await cartDataschema.find();
      res.json(orderditem );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/orderditem', async (req, res) => {
    console.log(req.body);
  
    const { cardata, username, status } = req.body;
  
    try {
      // Assuming you have a Product model defined
      const savedProducts = await Promise.all(
        cardata.map(async (item) => {
          const { name, amount, price, total_price } = item;
  
          const newProduct = new cartDataschema({
            name,
            price,
            amount,
            username,
            totalprice: total_price,
            approve: status,
          });
  
          return await newProduct.save();
        })
      );
  
      res.json({ message: 'Products created successfully', savedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.delete('/orderditem/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Check if the item exists
      const existingItem = await cartDataschema.findById(itemId);
      if (!existingItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Delete the item
      await cartDataschema.findByIdAndDelete(itemId);
  
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/orderditem/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Check if the item exists
      const existingItem = await cartDataschema.findById(itemId);
      if (!existingItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Update the 'approve' field
      existingItem.approve = '1'; // or whatever value you want to set
  
      // Save the updated item
      await existingItem.save();
  
      res.json({ message: 'Item approved successfully', updatedItem: existingItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;

