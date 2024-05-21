import express from 'express';
import {getProductList, getVeggiesList, getFruitsList, getGlossariesList, getBabiesProductsList} from '../controllers/product.controller.js';

const router = express.Router();

router.get("/AllProducts", getProductList);
router.get("/AllVeggies", getVeggiesList);
router.get("/AllFruits", getFruitsList);
router.get("/AllGlossaries", getGlossariesList);
router.get("/AllBabiesProducts", getBabiesProductsList);

export default router