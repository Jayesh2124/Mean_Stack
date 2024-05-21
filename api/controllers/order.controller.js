import Order from "../models/order.modules.js";
import { CreateError } from "../utils/error.js";
import { User } from "../models/user.models.js"
import { CreateSuccess } from "../utils/success.js";

export const saveOrder = async (req,res,next) =>{
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        return next(CreateSuccess(200,"Order Details Saved Successfully"))
    } catch (err) {
        return next(CreateError(500, ex.message));
    }
}

export const getOrders = async (req,res,next) => 
{
    try {
        const userId = req.body.userId
        const userInfo = await User.findById({_id:userId});
        const orderDetails = await Order.find({userId: userInfo._id });
        return next(CreateSuccess(200,"Order Details", orderDetails));
    } catch (ex) {
        return next(CreateError(500, ex.message));
    }
}