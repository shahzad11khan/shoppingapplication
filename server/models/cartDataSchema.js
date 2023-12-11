const mongoose = require('mongoose')
// Product Model
const cartDataSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    username:String,
    totalprice:Number,
    approve:String,
    // Add this field to store the user's first name
    // Add other fields from your CartData here
  });

const cartDataSchem= mongoose.model('cartDataSchema',cartDataSchema)
module.exports = cartDataSchem