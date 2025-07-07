
import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cardcontrollers.js';

import { celebrate, Joi } from 'celebrate';
import { validateTitle, validateLink } from '../utils/validators.js';

router.use(auth);


router.get('/getCards', getCards);
router.post('/createCards', celebrate({
      body: Joi.object().keys({
      title: validateTitle,
      link: validateLink
    })
  }), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard); 
router.delete('/:cardId/likes', dislikeCard); 

export default router;