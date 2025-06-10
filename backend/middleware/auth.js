const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        console.log('No authorization header');
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(" ")[1];
     if (!token) {
        console.log('No token found in header');
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    console.log('Token received:', token); // Debug log
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log('Decoded token:', decoded); // Debug log
        req.user = { _id: decoded.userId }; 
        next(); 
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = auth;

