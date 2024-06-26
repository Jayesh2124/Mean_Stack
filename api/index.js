import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import roleRoute from './routes/role.js'
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import orderRoute from './routes/order.js';
import cartRout from './routes/cart.js';
import cookieParser from 'cookie-parser';
import seedVeggiesData  from './seed.js';


const app = express();
 dotenv.config();
const port = 4000;
     
//routes and handler
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
// route paths
// app.use('/', (req,res)=>{
//     return res.send( "<h1> Hello Namaste 🐱‍🏍 </h1>")
// })

app.use('/api/role',roleRoute);
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/Products',productRoute);
app.use('/api/Orders',orderRoute);
app.use('/api/Cart',cartRout);

//Response handler Middleware
app.use((obj, req, res,next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went Wrong!";
    return res.status(statusCode).json({
        success: [200,201,204].some(a=> a== obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
})

// DB Connection 
const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL);
        if(process.argv.includes("--seed"))
        {
            await seedVeggiesData();
        }
        console.log("Connected to the DataBase");
    } catch (error) {
        console.log("Connection Failed");
        console.log(error.message);
    }
}

// listening port
app.listen(port, ()=>{
    connectToDB();
    console.log("Connected to backend");
    console.log(`Backend connected to : http://localhost:${port}/`);
})
