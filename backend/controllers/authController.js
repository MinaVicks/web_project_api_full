const User = require('../models/user');
console.log(User)

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
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Credenciales Invalidas"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({error:"Credenciales invalidas"})
        }
        const token = jwt.sign (
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.json({token, message:"Inicio de sesion exitoso"});



    }catch(error){
    res.status(500).json({error:"Credenciales invalidas"});
    }
};