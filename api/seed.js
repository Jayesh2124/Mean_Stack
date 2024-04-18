import VeggiesJson from './veggies.json' assert { type : "json"};
import Veggies from './models/vegies.models.js'
export const seedVeggiesData = async () =>{
    // connection to Database
    try {

        await Veggies.deleteMany({});
        await Veggies.insertMany(VeggiesJson);
        console.log("Data Seeded SuccessFully");

    } catch (error) {
        console.error("Error: ",error);
    }
    
}