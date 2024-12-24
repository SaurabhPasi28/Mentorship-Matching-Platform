import { NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

export async function GET(request) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Error getting user ID:", error.message);
    return NextResponse.json({ message: "Failed to get user ID" }, { status: 500 });
  }
}
