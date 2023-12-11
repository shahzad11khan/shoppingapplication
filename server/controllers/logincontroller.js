const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  User  = require('../models/usermodel');


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
    const payload={
      token: token,
      userId: user._id,
      userType: user.userType,
      username: user.username
    }
    res.status(200).json({ status : 200, message:  payload});

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = loginUser
