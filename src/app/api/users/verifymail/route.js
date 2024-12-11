import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

dbconnect();

export async function POST(request) {
    try {
        const reqBody= await request.json();
        const {token}= reqBody
        console.log(token);
        const user=await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid Token error" },
                {status:400}
            );
        }
        console.log(user);
        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined

        await user.save()

        return NextResponse.json({
            message:"Email Verified successfully"
        }, {status: 500})
    } catch (error) {
        return NextResponse.json({error: error.message},
            {status:500}
        );
    }
}