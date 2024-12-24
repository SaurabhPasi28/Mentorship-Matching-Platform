import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Parse query params for filters
        const role = searchParams.get("role");
        const skills = searchParams.get("skills");
        const interests = searchParams.get("interests");

        const query = {};

        // Apply filters if they exist
        if (role) query.role = role;
        if (skills) query.skills = { $in: skills.split(",") };
        if (interests) query.interests = { $in: interests.split(",") };

        const users = await User.find(query).select("-password");

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
