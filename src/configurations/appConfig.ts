import mongoose from "mongoose";
export const PORT = 3050;

export async function connectToMongo(uri:string) {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}