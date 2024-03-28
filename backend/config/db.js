import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting to database . . .");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;