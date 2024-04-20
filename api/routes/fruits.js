import express from 'express';
import { getFruits } from '../controllers/fruits.controller.js';

const router = express.Router();

router.get("/getAllFruits", getFruits );

export default router;