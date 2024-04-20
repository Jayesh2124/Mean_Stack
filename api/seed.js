import VeggiesJson from './veggies.json' assert { type : "json"};
import Veggies from './models/vegies.models.js'

export const seedVeggiesData = async () =>{
    // connection to Database
    try {
        console.log("\n Veggies Data Seeding initiated");
        await Veggies.deleteMany({});
        console.log("\n Previous Veggies Data deleted SuccessFully");
        await Veggies.insertMany(VeggiesJson);
        console.log("\n Veggies Data Seeded SuccessFully");

    } catch (error) {
        console.error("Error: ",error);
    } 
};

export default seedVeggiesData