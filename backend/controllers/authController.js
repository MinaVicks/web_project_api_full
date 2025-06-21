import { User } from '../models/user.js';
import { successResponse, errorResponse } from '../utils/responseUtils';
import { hash as _hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function register(req, res) {
  
    const { email, password } = req.body;

    try {
        const hash = await _hash(password, 10);
        const user = await User.create({email, password: hash});
        const token = sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

    return successResponse(res, {
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      }
    }, 201);

    } catch (error) {
         if (error.code === 11000) {
            return res.status(400).json({
                message: 'Email already exists',
                error: 'DUPLICATE_EMAIL'
            });
        }
        
        
        res.status(400).json({
            message: 'Registration failed',
            error: error.message
        });
    }
}

export async function login(req,res) {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return errorResponse(res, 'Invalid credentials', 401);
        }
        const isMatch = await compare(password, user.password)
        if(!isMatch){
            return errorResponse(res, 'Invalid credentials', 401);
        }
       const token = sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return successResponse(res, {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      }
    });



    }catch(error){
    return errorResponse(res, 'Login failed', 500, error);
    }
}

export async function getCurrentUser(req, res) {
  try {
    
    const user = await User.findById(req.user._id)
    .select('-password -__v') // Exclude sensitive/unneeded fields
    .lean(); // Convert to plain JS object
 
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      }
    });
  } catch (error) {
    return errorResponse(res, 'Error fetching user data', 500, error);
  }
}

export async function updateAvatar(req, res) {
  try {
    const { avatar } = req.body;
    
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
}