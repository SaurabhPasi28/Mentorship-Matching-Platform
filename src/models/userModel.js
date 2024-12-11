// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: [true, "Please Provide a username"],
//         unique: true
//     }, 
//     email:{
//         type: String,
//         required: [true, "Please Provide a email"],
//         unique: true
//     },
//     password:{
//         type: String,
//         required: [true, "Please Provide a password"],
//     },
//     isVerified:{
//         type: Boolean,
//         default: false
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken:String,
//     verifyTokenExpiry:Date, 
    
// })

// const User = mongoose.model.users|| mongoose.model("users", userSchema)
// export default User


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
        default: null,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
        default: null,
    },
    verifyToken: {
        type: String,
        default: null,
    },
    verifyTokenExpiry: {
        type: Date,
        default: null,
    },
});

// Use the existing model if it exists, otherwise create it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
