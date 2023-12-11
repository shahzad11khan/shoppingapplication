const express = require('express');
const router = express.Router();
const fromdataschema = require('../models/formDataSchema');

router.get('/userorderitem', async (req, res) => {
    try {
      const orderditem = await fromdataschema.find();
      res.json(orderditem );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/userorderitem', async (req, res) => {
    console.log(req.body)
    try {
      const newUser = new fromdataschema(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Mongoose validation error
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/userorderitem/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Check if the item exists
      const existingItem = await fromdataschema.findById(itemId);
      if (!existingItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Delete the item
      await fromdataschema.findByIdAndDelete(itemId);
  
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;