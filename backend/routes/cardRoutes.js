// routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cardControllers.js');

router.use(auth);

// Properly formatted routes
router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/:cardId', deleteCard); // Note :cardId
router.put('/:cardId/likes', likeCard); // Note :cardId
router.delete('/:cardId/likes', dislikeCard); // Note :cardId

module.exports = router;