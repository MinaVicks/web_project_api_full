import { User } from '../models/user.js';

import { 
  BadRequestError, 
  ConflictError, 
  NotFoundError 
} from '../utils/errorUtils.js';

import { successResponse, errorResponse } from '../utils/ResponseUtils.js';
import { hash as _hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function register (req, res, next) {
  
    const { email, password } = req.body;

    try {
        if (!email || !password) {
        throw new BadRequestError('Email y contraseña son requeridos');
        }

        const existingUser = await User.findOne({ email });
           if (existingUser) {
            throw new ConflictError();
             }

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

    }  catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {

    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email}).select('+password');
        if(!user){
            throw new BadRequestError('Se pasaron datos inválidos');
        }
        const isMatch = await compare(password, user.password)
        if(!isMatch){
            throw new BadRequestError('Se pasaron datos inválidos');
        }
       const token = sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
        
      console.log('Login attempt for:', email);
      console.log('User found:', user); 
      console.log('Password match:', isMatch); 

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
    next(error);
    }
}

export async function getCurrentUser(req, res, next) {
  try {
    
    const user = await User.findById(req.user._id)
    .select('-password -__v')
    .lean();
 
    if (!user) {
      throw new NotFoundError('No se encontró el recurso solicitado');
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
     next(error);
  }
}

export async function updateAvatar(req, res, next) {
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
      throw new NotFoundError('No se encontró el recurso solicitado');
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
        const { name, about } = req.body;
    if (!name || !about) {
      throw new BadRequestError('Nombre y descripción son requeridos');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundError('Usuario no encontrado');
    }

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}