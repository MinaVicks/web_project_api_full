// routes/cardRoutes.js
import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cardControllers.js';

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
router.delete('/:cardId', deleteCard); // Note :cardId
router.put('/:cardId/likes', likeCard); // Note :cardId
router.delete('/:cardId/likes', dislikeCard); // Note :cardId

export default router;