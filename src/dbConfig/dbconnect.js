// import mongoose from "mongoose";

// export async function dbconnect(){
//     try{
//         mongoose.connect(process.env.MONGODB_URI)
//         const connection= mongoose.connection
//         connection.on("connected", ()=>{
//             console.log("MongoDB connected Successfully")
//         })
//         connection.on("error", (error)=>{
//             console.log("MongoDB connection error please make sure db is up running", error)
//             process.exit()
//         })
//     }catch(error){
//         console.log("Something went wrong in connecting ot mongoDB")
//         console.log(error);
//     }
// }

import mongoose from "mongoose";

export async function dbconnect() {
    if (mongoose.connection.readyState >= 1) {
        // If already connected, return the existing connection
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected.");
    });
}


// export async function dbconnect() {
//     if (mongoose.connection.readyState === 1) {
//         console.log("Database already connected.");
//         return;
//     }
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Database connected successfully.");
//     } catch (error) {
//         console.error("Database connection failed:", error);
//         throw error;
//     }
// }
