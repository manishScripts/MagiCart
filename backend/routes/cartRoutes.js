import express from 'express';
import { addTocart ,updateCart,getUserCart,removeFromCart } from '../controller/cartController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/add', isAuth ,addTocart);
router.post('/update', isAuth, updateCart);
router.post('/remove', isAuth, removeFromCart);
router.get('/get', isAuth, getUserCart);

export default router;
