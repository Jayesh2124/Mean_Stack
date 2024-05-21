import express from 'express';
import { getOrders, saveOrder } from '../controllers/order.controller.js';

const router = express.Router();
router.get('/getOrders/:id',getOrders);
router.post('/saveOrder',saveOrder);


export default router;