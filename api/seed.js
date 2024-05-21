import VeggiesJson from './veggies.json' assert { type : "json"};
import {ProductModel} from './models/product.models.js'

export const seedVeggiesData = async () =>{
    // connection to Database
    try {
        console.log("\n Veggies Data Seeding initiated");
        await ProductModel.deleteMany({});
        console.log("\n Previous Veggies Data deleted SuccessFully");
        await ProductModel.insertMany(VeggiesJson);
        console.log("\n Veggies Data Seeded SuccessFully");

    } catch (error) {
        console.error("Error: ",error);
    } 
};

export default seedVeggiesData