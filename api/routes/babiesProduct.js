import express from 'express'
import {GetAllBabiesProduct} from '../controllers/babiesProducts.controller.js'

const router = express.Router();

router.get("/GetAllBabiesProduct",GetAllBabiesProduct );

export default router;