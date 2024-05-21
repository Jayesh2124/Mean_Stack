import { CreateError } from "../utils/error.js"
import cart from "../models/cart.modules.js";
import { CreateSuccess } from "../utils/success.js";

export const saveToCart = async (req,res,next) =>{
    try {
        const cartInfo = new cart(req.body);
        cartInfo.save();
        return next(CreateSuccess(200,"Products are added into cart"));
    } catch (error) {
        return next(CreateError(500,error.message));
    }
}

export const getCartInfoByUserId = async (req,res,next) =>{
    try {
        const userInfo = User.findById({_id: req.body.userId });
        const cartInfo = await cart.findOne({userId: userInfo.userId });
        return next(CreateSuccess(200,"Products into cart",cartInfo));
    } catch (error) {
        return next(CreateError(500,error.message));
    }
}