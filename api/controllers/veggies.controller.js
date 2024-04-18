import Veggies from '../models/vegies.models.js'
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const getVeggies = async (req,res,next) =>{
    try{
        const veggies = await Veggies.find(); 
        return next(CreateSuccess(200,"All Veggies here",veggies));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}