import mongoose from "mongoose";

const BabiesProductSchema = mongoose.Schema({
   
        product: {
            type:String,
            required:true
        },
        type: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        ingredients:{
            type:[String],
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        volume: {
            type:String,
            required:true
        }
    },
    {
        timestamps : true
    }
)

export default mongoose.model("BabiesProduct",BabiesProductSchema);