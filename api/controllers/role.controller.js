import {Role} from '../models/role.models.js'
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const CreateRole = async (req,res,next)=>{
    try {
        if(req.body.role && req.body.role != ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(200,"Role is Created!",newRole));
        }
        else{
            return res.status(400).send("Bad Request..!");
        }
    } catch (error) {
         return next(CreateError(500,`Internal Server Error : ${error.message}`));
    }
}

export const getAllRoles = async (req,res,next)=>{
    try {
        const roles = await Role.find({});
        if(!roles){
            return next(CreateError(400,"Bad Request!"))
        }
        else{
            return next(CreateSuccess(200,"get all roles",roles));
        }
    } catch (error) {
         return next(CreateError(500,`Internal Server Error : ${error.message}`));
    }
}

export const updateRole = async (req,res,next)=>{
    try {
        const role = await Role.findById({_id:req.params.id});
        if(!role)
             return  next(CreateError(400,"Bad Request!"))

        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new : true}
        )
        return next(CreateSuccess(200,"Role is updated!"));
    } catch (error) {
         return next(CreateError(500,`Internal Server Error : ${error.message}`));
    }
}

export const deleteRole = async (req,res,next)=>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id:roleId});
        if(!role)
                return  next(CreateError(400,"Bad Request!"))
        const deleteRole = await Role.findByIdAndDelete(roleId);
        return next(CreateSuccess(200,"Role Deleted!"));
    } catch (error) {
        return next(CreateError(500,`Internal Server Error : ${error.message}`));
    }
}

