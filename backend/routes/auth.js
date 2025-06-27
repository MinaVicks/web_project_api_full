import { Router } from 'express';
import { register, login, getCurrentUser, updateAvatar, updateProfile } from '../controllers/authcontroller.js';
import auth from "../middleware/auth.js";


import { celebrate, Joi } from 'celebrate';
import { validateEmail, validatePassword, validateURL } from '../utils/validators.js';


const router = Router();


router.post("/signup",  celebrate({
      body: Joi.object().keys({
      email: validateEmail,
      password: validatePassword,
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().custom(validateURL)
    })
  }), register);

router.post("/signin", celebrate({
      body: Joi.object().keys({
      email: validateEmail,
      password: validatePassword
    })
  }), login);

router.get("/users/me",auth, getCurrentUser )
router.patch('/users/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: validateURL
    })
  }), auth, updateAvatar);
router.patch("/users/me", auth, updateProfile )


export default router;