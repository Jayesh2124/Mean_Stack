import BabiesProduct from './models/babiesProducts.models.js'
import BabiesProductJason from './babiesProductSeed.json' assert { type : "json"};

export const seedingBabiesProducts = async()=>{
    try {
        try {
            console.log("\n BabiesProduct Data seeding started");
            await BabiesProduct.deleteMany();
            console.log("\n Prev BabiesProduct Data deleted successfully");
            console.log(BabiesProductJason);
            let insertData = await BabiesProduct.insertMany(BabiesProductJason)    
            console.log("\n BabiesProduct Data Seeded SuccessFully", insertData);
        } catch (error) {
            console.error(error.message)
        }
    } catch (error) {
        
    }
}

export default seedingBabiesProducts;
