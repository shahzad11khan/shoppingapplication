const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('./db/db')
require('dotenv').config();
const userRoutes = require('./routes/userroutes'); 
const productRoutes = require('./routes/productsroutes'); 
const cartDataschema = require('./routes/orderroutes');
const fromdataschema = require('./routes/userinformationroutes');
const { authenticateUser } = require('./middlewares/middleware');

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 
app.use('/images', express.static(path.join(__dirname, 'products/images')));
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartDataschema);
app.use('/api', fromdataschema);



// 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});