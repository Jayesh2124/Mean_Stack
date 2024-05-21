import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';
import  {ProductModel}  from '../models/product.models.js'

export const getProductList = async (req,res,next) =>{
    try{
        const Products = await ProductModel.find(); 
        return next(CreateSuccess(200,"All Products here",Products));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}

export const getVeggiesList = async (req,res,next) =>{
    try{
        const Products = await ProductModel.find({category : 'vegetable'}); 
        return next(CreateSuccess(200,"All Products here",Products));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}

export const getFruitsList = async (req,res,next) =>{
    try{
        const Products = await ProductModel.find({category : 'fruit'}); 
        return next(CreateSuccess(200,"All Products here",Products));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}

export const getGlossariesList = async (req,res,next) =>{
    try{
        const Products = await ProductModel.find({category : 'grocery'}); 
        return next(CreateSuccess(200,"All Products here",Products));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}

export const getBabiesProductsList = async (req,res,next) =>{
    try{
        const Products = await ProductModel.find({category : 'BabiesProduct'}); 
        return next(CreateSuccess(200,"All Products here",Products));
    }catch (error){
        return next(CreateError(500,`Server Error: ${error.message}`));
    }
}