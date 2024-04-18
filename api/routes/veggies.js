import express from 'express';
import {getVeggies} from '../controllers/veggies.controller.js';

const router = express.Router();

router.get("/Vegetables", getVeggies);

export default router