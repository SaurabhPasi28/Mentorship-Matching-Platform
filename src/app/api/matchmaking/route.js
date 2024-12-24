import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import {getDataFromToken} from "@/utils/getDataFromToken"; // Assumes a utility to get the current logged-in user session
import { NextResponse } from "next/server";

dbconnect();

export async function GET(request) {
    try {
        const userId = await getDataFromToken(request);
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }
        
        
        // Extract the logged-in user's data
        const currentUser = await User.findById(userId);
        console.log("-------------->11111",currentUser);

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const { skills, role } = currentUser;
    // Define the matchmaking logic
    const oppositeRole = role === "mentor" ? "mentee" : "mentor"; // Opposite role
    const matches = await User.find({
      role: oppositeRole, // Match users with the opposite role
      skills: { $in: skills }, // Match users with at least one common skill
    }).select("-password"); // Exclude sensitive fields like password

    return NextResponse.json({
      matches,
    });
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
