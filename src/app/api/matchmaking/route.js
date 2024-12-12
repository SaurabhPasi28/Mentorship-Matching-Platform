import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

dbconnect();

export async function GET(request) {
    try {
        // Extract user ID from the token
        const userId = await getDataFromToken(request);

        // Get the current user's profile
        const currentUser = await User.findById(userId).select("-password");
        if (!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Find potential matches based on opposite roles and shared interests/skills
        const matches = await User.find({
            role: currentUser.role === "mentor" ? "mentee" : "mentor",
            $or: [
                { skills: { $in: currentUser.skills } },
                { interests: { $in: currentUser.interests } },
            ],
        }).select("-password");

        return NextResponse.json({ matches });
    } catch (error) {
        console.error("Error fetching matches:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
