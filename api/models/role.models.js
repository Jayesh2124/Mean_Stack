import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
    {
        role:{
            type: String,
            required: true
        }
    },
    {
        timestamps : true
    }
);


export const Role = new mongoose.model("Role", roleSchema);