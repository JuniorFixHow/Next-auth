import mongoose from "mongoose";

let isConnected =  false;

export const connectDB = async()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('Mongo connected already');
        return
    }

    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('Mongo connected successfully')
    } catch (error) {
        console.log(error);
        throw new Error('DB connection failed')
    }
}