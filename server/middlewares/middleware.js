// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.error('Error verifying JWT token:', error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// module.exports = { authenticateUser };



// In your middleware.js file

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Validate and decode the token, set user ID in req.userId
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = { authenticateUser };

  
//   react js code 

// import axios from 'axios';

// const token = /* your token */;
// const apiUrl = 'http://localhost:5000/api/users';

// axios.get(apiUrl, {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
//   },
// })
// .then(response => console.log(response.data))
// .catch(error => console.error('Error:', error));

