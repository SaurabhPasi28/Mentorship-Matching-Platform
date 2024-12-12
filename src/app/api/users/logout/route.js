// import { dbconnect } from "@/dbConfig/dbconnect";

// import { NextResponse } from "next/server";


// dbconnect();

// export async function GET(request) {
//     try {
//         // console.log("welcome to logout")
//         const response=NextResponse.json({
//             message: "Logout Successfully",
//             success:true
//         })

//         response.cookies.set("token","",{
//             httpOnly: true,
//             secure:true,
//             // expires: new Date(0)

//         })

//         return response;
//     } catch (error) {
//         return NextResponse.json({error: error.message},
//         {status:500})
//     }
// }

import { dbconnect } from "@/dbConfig/dbconnect";
import { NextResponse } from "next/server";

dbconnect();

export async function GET(request) {
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
      expires: new Date(0), // Explicitly set the expiration date to the past
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
