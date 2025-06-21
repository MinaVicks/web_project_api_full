// routes/cardRoutes.js
import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cardControllers.js';

router.use(auth);

// Properly formatted routes
router.get('/getCards', getCards);
router.post('/createCards', createCard);
router.delete('/:cardId', deleteCard); // Note :cardId
router.put('/:cardId/likes', likeCard); // Note :cardId
router.delete('/:cardId/likes', dislikeCard); // Note :cardId

export default router;