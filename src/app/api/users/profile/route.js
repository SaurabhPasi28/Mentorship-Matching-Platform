import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

// Connect to the database
dbconnect();

export async function POST(request) {
    try {
        // Extract user ID from the token
        const userId = await getDataFromToken(request);

        // Find user by ID and exclude password field
        const user = await User.findOne({ _id: userId }).select("-password");

        // If user not found, return an error
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return user data
        return NextResponse.json({
            message: "User Found",
            data: user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const userId = await getDataFromToken(request);

        // Parse the request body
        const updatedData = await request.json();

        // Update the user with the provided data
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Validate the updated fields
        }).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Profile updated successfully",
            data: user
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
