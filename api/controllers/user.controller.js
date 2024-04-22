import { Role } from "../models/role.models.js";
import { User } from "../models/user.models.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getAllUser = async (req,res,next)=>{
    try {
         const users = await User.find({})
        if(users){
            return res.status(200).send(users)
        }
        else{
            return res.status(400).send("Bad Request!")
        }
    } catch (error) {
        return  res.status(500).send(`Internal Server Error :  ${error.message}`);
        
    }
}

export const updateUser = async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const userData = await User.findById({_id:userId});
        if(userData){
            const newUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true} 
            );
            return res.status(200).send("user Updated!");
        }
        else{
            return res.status(400).send("Bad Request!");
        }
    }  catch (error) {
        return  res.status(500).send(`Internal Server Error :  ${error.message}`);
    }
}

export const getUserById = async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const userData = await User.findById({_id:userId});
        if(userData)
            return res.status(200).send(userData);
        return res.status(400).send("Bad Request!");
    } catch (error) {
        return  res.status(500).send(`Internal Server Error :  ${error.message}`);
    }
}

export const getUserByEmail = async (req,res,next)=>{
    try {
        const email = req.params.email;
        let userData = await User.findOne({ emails: { $regex: '^' + email + '$', $options: 'i' } })
        const roleData = await Role.findById({_id:userData.roles[0]._id})
        console.log(userData);
        console.log(roleData.role);
        //userData.roles.push(roleData.role)
        if(userData)
            return next(CreateSuccess(200,"Here is the UserData",userData))
        return next(CreateError(400,"Something Went Wrong in User Call"))
    } catch (error) {
        return  res.status(500).send(`Internal Server Error :  ${error.message}`);
    }
}

export const deleteUser = async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const userData = await User.findById({_id:userId});
        if(!userData)   return res.status(400).send("Bad Request!");

        await User.findByIdAndDelete(userId)
        return res.status(200).send("User Deleted!");
    } catch (error) {
        return  res.status(500).send(`Internal Server Error :  ${error.message}`);
    }
}