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
            default :"https://www.flaticon.com/free-animated-icon/man_12761844?term=user&page=1&position=65&origin=tag&related_id=12761844"
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