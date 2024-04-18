import mongoose from "mongoose";

const VeggiesSchema = mongoose.Schema(
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
            required: true
        },
    },
    {
        timestamps : true
    }
);

export default mongoose.model("Veggies", VeggiesSchema);