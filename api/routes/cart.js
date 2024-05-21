import express from 'express';
import { getCartInfoByUserId,saveToCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:id',getCartInfoByUserId);
router.post('/Save',saveToCart);

export default router;