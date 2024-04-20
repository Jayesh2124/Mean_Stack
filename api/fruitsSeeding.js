import FruitsJson from './fruits.json' assert { type : "json"};
import veggiesJson from './veggies.json' assert {type : "json"};
import Fruits from './models/fruits.models.js'

export const seedFruitsData = async () =>{
    try {
        console.log("\n Fruits Data seeding started");
        await Fruits.deleteMany();
        console.log("\n Prev Fruits Data deleted successfully");
        console.log(FruitsJson);
        let insertData = await Fruits.insertMany(FruitsJson)    
        console.log("\n Fruits Data Seeded SuccessFully", insertData);
    } catch (error) {
        console.error(error.message)
    }
};

export default seedFruitsData


