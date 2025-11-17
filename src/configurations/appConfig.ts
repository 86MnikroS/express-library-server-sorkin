import mongoose from "mongoose";
export const PORT = 3050;

export const db = 'mongodb+srv://sorkinmihail_db_user:2wQJ9mbrwTndXxnw@cluster0.0k2kaeu.mongodb.net/?appName=Cluster0';

export async function connectToMongo(uri:string) {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}