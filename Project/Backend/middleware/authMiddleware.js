import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check token expiration
        if (decoded.exp < Date.now() / 1000) {
          return res.status(401).json({ 
            message: 'Token expired', 
            code: 'TOKEN_EXPIRED' 
          });
        }

        // Add timestamp check
        const tokenTimestamp = decoded.iat;
        const storedTimestamp = req.headers['x-auth-timestamp'];
        
        if (storedTimestamp && tokenTimestamp < parseInt(storedTimestamp)) {
          return res.status(401).json({
            message: 'Session invalidated',
            code: 'SESSION_INVALID'
          });
        }

        const user = await User.findById(decoded.userId)
          .select('-password')
          .lean(); // Use lean() for better performance
        
        if (!user) {
          return res.status(401).json({ 
            message: 'User not found',
            code: 'USER_NOT_FOUND'
          });
        }

        req.user = user;
        next();
      } catch (jwtError) {
        console.error('JWT verification error:', jwtError);
        return res.status(401).json({ 
          message: 'Invalid token',
          code: 'INVALID_TOKEN'
        });
      }
    } else {
      res.status(401).json({ 
        message: 'No token provided',
        code: 'NO_TOKEN'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

// Optional: Role-based middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Not authorized to access this route' 
      });
    }
    next();
  };
};