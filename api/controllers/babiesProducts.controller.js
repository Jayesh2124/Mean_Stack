import babiesProductsModels from "../models/babiesProducts.models.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";


export const GetAllBabiesProduct = async (req,res,next) =>{
    try {
        const babiesProducts = await babiesProductsModels.find();
        return next(CreateSuccess(200,"All Babies Products",babiesProducts));
    } catch (error) {
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}