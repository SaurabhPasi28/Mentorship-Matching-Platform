import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token data: ", decodedToken);

        return decodedToken.id;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        if (error.name === "TokenExpiredError") {
            const url = new URL("/login", request.url);
            url.searchParams.set("alert", "session_expired");
        }

        return null;
    }
};

