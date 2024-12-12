import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Utility function to get user data from token (e.g., user ID)
export const getDataFromToken = (request) => {
    try {
        // Retrieve the token from the request cookies
        const token = request.cookies.get("token")?.value || "";

        // If no token is present, return null (indicating no user is authenticated)
        if (!token) {
            return null;
        }

        // Verify and decode the token using JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Return the user ID from the decoded token
        return decodedToken.id;

    } catch (error) {
        // Handle errors gracefully and return null if verification fails (invalid/expired token)
        console.error("Token verification failed:", error.message);
        return null;
    }
}
