import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// Connect to the database
dbconnect();

export async function GET(request, { params }) {
  try {
    const { userId } = params;

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}