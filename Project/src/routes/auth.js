const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
    // If user exists but has no password (new user)
    if (user && !user.password) {
      return res.json({ isNewUser: true });
    }
    
    // Normal login logic
    if (user && user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // Create session/token
        return res.json({ success: true });
      }
    }
    
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Setup password route
router.post('/setup-password', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user with new password
    user.password = hashedPassword;
    await user.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 