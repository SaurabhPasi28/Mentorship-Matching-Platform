import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" },
        bio: { type: String, default: "" },
        gender: { type: String, enum: ["male", "female", "other"], default: "other" },
        role: { type: String, enum: ["mentee", "mentor"], required: true },
        skills: { type: [String], default: [] },
        interests: { type: [String], default: [] },
        requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        connected: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
