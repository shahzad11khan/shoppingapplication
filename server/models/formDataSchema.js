const mongoose = require('mongoose')
// Product Model
const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    address2: String,
    ccCvv: String,
    ccExpiration: String,
    ccName: String,
    ccNumber: String,
    city: String,
    country: String,
    phone: String,
    state: String,
    zip: String,
  });

const formDataSchem= mongoose.model('fromdataschema',formDataSchema)
module.exports = formDataSchem