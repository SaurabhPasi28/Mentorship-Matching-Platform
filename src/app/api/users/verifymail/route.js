// import { dbconnect } from "@/dbConfig/dbconnect";
// import User from "@/models/userModel";
// import { NextRequest,NextResponse } from "next/server";

// dbconnect();

// export async function POST(request) {
//     try {
//         const reqBody= await request.json();
//         const {token}= reqBody
//         console.log(token);
//         const user=await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt:Date.now()}})
//         if(!user){
//             return NextResponse.json({error:"Invalid Token error" },
//                 {status:400}
//             );
//         }
//         console.log(user);
//         user.isVerified=true
//         user.verifyToken=undefined
//         user.verifyTokenExpiry=undefined

//         await user.save()

//         return NextResponse.json({
//             message:"Email Verified successfully"
//         }, {status: 500})
//     } catch (error) {
//         return NextResponse.json({error: error.message},
//             {status:500}
//         );
//     }
// }


import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbconnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // Validate input
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    console.log("Token received:", token);

    // Find the user by token and ensure the token is not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
