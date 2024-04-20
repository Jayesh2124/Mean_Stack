import mongoose from "mongoose";

const FruitsSchema =  mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        nutrients:{
            type: [String],
            required: true
        },
        price_per_kg:{
            type: Number,
            required: false
        },
    },
    {
        timestamps : true
    }
);

export default mongoose.model("Fruits", FruitsSchema)