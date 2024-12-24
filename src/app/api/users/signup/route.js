import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";// Ensure this utility is correctly implemented

dbconnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User registered successfully. Please verify your email.",
      success: true,
    });
  } catch (error) {
    console.error("Error in signup route:", error.message);
    return NextResponse.json(
      { error: "An error occurred during signup. Please try again later." },
      { status: 500 }
    );
  }
}
