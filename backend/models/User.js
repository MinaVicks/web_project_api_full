const mongoose = require('mongoose');
const Joi = require('joi');

const userJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(39),
  about: Joi.string().min(2).max(39),
  avatar: Joi.string().uri().pattern(/\.(jpg|jpeg|png|gif)$/i),
});

const userSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
    
  },
  name:{
    type:String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 40,
    
  },
  about:{
    type:String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 40,
  },
  avatar:{
    type:String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: (v) => /^https?:\/\/.+\..+/.test(v), 
      message: props => `${props.value} is not a valid URL!`
    }
  }

});

module.exports ={ User: mongoose.model('User', userSchema), userJoiSchema};
