// import { dbconnect } from "@/dbConfig/dbconnect";
// import User from "@/models/userModel";
// import { NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/utils/mailer";
// import jwt from "jsonwebtoken"

// dbconnect();

// export async function POST(request) {
//   try {
//     const reqBody = await request.json();
//         const {email, password } = reqBody;

//         console.log("Request Body:", reqBody);

//         // Check if the user already exists
//         const user = await User.findOne({ email });
//         if(!user){
//           return NextResponse.json({error:"User does not exist"}, {status: 400})
//         }
//         console.log("-------->",user);

//       const validPassword= await bcryptjs.compare(password,user.password)
//       if(!validPassword){
//         return NextResponse.json({error:"Check Your credentials"}, {status: 400})
//       }

//       const tokenData={
//         id: user._id,
//         username: user.username,
//         email: user.email
//       }

//       const token=await jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: "1d"})

//       const response=NextResponse.json({
//         message: "Longed in successfully",
//         success: true
//       })

//       response.cookies.set("token", token,{
//         httpOnly: true, 
//         secure:true
//       })
//       return response;

//   } catch (error) {
//     return NextResponse.json({error: error.message},
//       {status:500}
//   );
//   }
// }


import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbconnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User does not exist" }, { status: 400 });
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 });
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment variables");
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
      tokenExpiry: "24 hours",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
