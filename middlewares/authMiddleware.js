const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authenticate middleware to verify the token and user
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get token from "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify JWT
    req.user = await User.findById(decoded.id);  // Attach the user to the request
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorize middleware to check if the user has the correct role
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {  // Check if the user's role is in the allowed roles
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticate, authorize };
