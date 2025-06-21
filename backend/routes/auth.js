import { Router } from 'express';
import { register, login, getCurrentUser, updateAvatar } from '../controllers/authcontroller.js';
const router = Router();
import auth from "../middleware/auth.js";

router.post("/signup", register);
router.post("/signin", login);
router.get("/users/me",auth, getCurrentUser )
router.patch('/users/me/avatar', auth, updateAvatar);



export default router;