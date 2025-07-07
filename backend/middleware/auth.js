import pkg from 'jsonwebtoken';
const { verify } = pkg;
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];
if(!token) return res.status(401).json({error: "No se encuentra el token"})
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = { _id: decoded.userId }; 
        next(); 
    }
    catch (error) {
      
        return res.status(400).json({ message: 'Invalid token' });
    }
};


export default auth;


