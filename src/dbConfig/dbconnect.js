import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function dbconnect() {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process if there's a connection error
    }

    mongoose.connection.on("disconnected", () => {
        isConnected = false;
        console.log("MongoDB disconnected.");
    });
}


