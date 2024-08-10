const jwt =require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();


exports.auth =( req,res,next )=>{
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  

exports.role = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: 'Access denied' });
  next();
};
