const mongoose = require('mongoose')
// Product Model
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    featured: Boolean,
    shipping: String,
    stock: Number,
    image:String,
    company:String
  });
const products= mongoose.model('Product',productSchema)
module.exports = products