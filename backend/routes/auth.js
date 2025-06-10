const express = require('express');
const {register,login, getCurrentUser, updateAvatar} = require('../controllers/authcontroller.js');
const router = express.Router();
const auth = require("../middleware/auth.js")

router.post("/signup", register);
router.post("/signin", login);
router.get("/users/me",auth, getCurrentUser )
router.patch('users/me/avatar', auth, updateAvatar);



module.exports = router;