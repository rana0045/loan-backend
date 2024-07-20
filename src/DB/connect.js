import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI
        const connection = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
        console.log(error.message);
    }
}


export default connectDB