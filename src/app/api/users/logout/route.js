import { dbconnect } from "@/dbConfig/dbconnect";

import { NextResponse } from "next/server";

dbconnect();

export async function GET(request) {
    try {
        // console.log("welcome to logout")
        const response=NextResponse.json({
            message: "Logout Successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly: true,
            secure:true,
            // expires: new Date(0)

        })

        return response;
    } catch (error) {
        return NextResponse.json({error: error.message},
        {status:500})
    }
}