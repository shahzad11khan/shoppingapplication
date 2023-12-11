const mongoose = require('mongoose');
const dbURI= 'mongodb://127.0.0.1:27017/ecom'
// const dbURI= process.env.DATABASE_URL

mongoose.connect(dbURI);

const dbConnection = mongoose.connection;

dbConnection.on('connected', () => {
  console.log('MongoDB is connected');
});

dbConnection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

  