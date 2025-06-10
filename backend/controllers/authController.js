const {User} = require('../models/user.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: hash});
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    }
    catch (error) {
         res.status(400).json({ 
        message: 'Usuario no registrado',
        error: error.message, 
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
    }
};

exports.login = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({error: "Credenciales Invalidas"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({error:"Credenciales invalidas"})
        }
       const generateToken = (userId) => {
        return jwt.sign(
             { userId },
             process.env.JWT_SECRET,
                { expiresIn: '7d' } 
            );
        };
        res.json({ 
            token: generateToken(user._id),
            email: user.email
         });

         console.log("Login response:", { 
            token: generateToken(user._id),
            email: user.email
        });



    }catch(error){
    res.status(500).json({error:"Credenciales invalidas"});
    }
};

exports.getCurrentUser = async (req, res) => {
  try {
    
    const user = await User.findById(req.user._id).select('-password'); 
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    
    // Validate URL format
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(avatar)) {
      return res.status(400).json({ message: 'Invalid avatar URL format' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Avatar update error:', error);
    res.status(500).json({ message: 'Error updating avatar', error: error.message });
  }
};