import express from 'express';
// import {authController} from '../controllers/authController.js';
import { registration , login , logout , googleSignUp ,adminLogin} from '../controller/authController.js';
const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/logout', logout);
router.post('/googleSignUp', googleSignUp);
router.post('/adminLogin', adminLogin);
export default router;