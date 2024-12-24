import { dbconnect } from "@/dbConfig/dbconnect";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    // Clear the authentication token cookie
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0), 
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
