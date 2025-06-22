import { Router } from 'express';
import { register, login, getCurrentUser, updateAvatar } from '../controllers/authcontroller.js';
import auth from "../middleware/auth.js";



const router = Router();


router.post("/signup", register);
router.post("/signin", login);
router.get("/users/me",auth, getCurrentUser )
router.patch('/users/me/avatar', auth, updateAvatar);



export default router;