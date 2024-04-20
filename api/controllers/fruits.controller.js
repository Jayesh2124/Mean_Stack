import Fruits from "../models/fruits.models.js"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getFruits = async (req,res,next)=>{
    try {
        const fruitData = await Fruits.find();
        return next(CreateSuccess(200,"Here all Fruits data",fruitData));
    } catch (error) {
        return next(CreateError(500,error.message));
    }
}