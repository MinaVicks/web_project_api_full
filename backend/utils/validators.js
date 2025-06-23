import validator from 'validator';
import Joi from 'joi';

export const validateURL = (value, helpers) => {
  if (validator.isURL(value, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true
  })) {
    return value;
  }
  return helpers.error('string.uri');
};

export const validateEmail = Joi.string().email().required();
export const validatePassword = Joi.string().min(8).required();
export const validateName = Joi.string().min(2).max(30).required();
export const validateAbout = Joi.string().min(2).max(200).required();
export const validateAvatar = Joi.string().required().custom(validateURL);
export const validateTitle = Joi.string().min(2).max(30).required();
export const validateLink = Joi.string().required().custom(validateURL);