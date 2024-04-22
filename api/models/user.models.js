import { mongoose, Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        userName:{
            type: String,
            required : true,
            unique: true,
        },
        emails:{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true
        },
        profileImage:{
            type: String,
            required: false,
            default :"https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            required:true,
            ref: "Role"
        }
    }
    ,{
        timestamps: true
    }
);




export const User = mongoose.model("User",userSchema);