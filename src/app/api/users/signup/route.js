import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

dbconnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password, role } = reqBody;

        // console.log("Request Body:", reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user with role
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role, // Store role (mentor/mentee)
        });

        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered successfully. Please verify your email.",
            success: true,
            savedUser,
        });
    } catch (error) {
        console.error("Error in signup route:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
