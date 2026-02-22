import express from 'express';
import { currUser, adminProfile as adminProfileController } from '../controller/userController.js';
import { isAuth } from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
const router = express.Router();

router.get('/profile',isAuth, currUser);
router.get('/adminProfile',adminAuth, adminProfileController);

export default router;    