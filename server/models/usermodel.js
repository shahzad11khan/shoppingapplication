const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userType: String, // Add this line
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;