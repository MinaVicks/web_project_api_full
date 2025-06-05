const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardControllers.js");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.use(auth);

// All routes now properly defined with parameter names
router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);          // :cardId parameter
router.put("/:cardId/likes", likeCard);        // :cardId parameter
router.delete("/:cardId/likes", dislikeCard);  // :cardId parameter

module.exports = router;