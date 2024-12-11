import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import jwt from "jsonwebtoken"

dbconnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
        const {email, password } = reqBody;

        console.log("Request Body:", reqBody);

        // Check if the user already exists
        const user = await User.findOne({ email });
        if(!user){
          return NextResponse.json({error:"User does not exist"}, {status: 400})
        }
        console.log("-------->",user);

      const validPassword= await bcryptjs.compare(password,user.password)
      if(!validPassword){
        return NextResponse.json({error:"Check Your credentials"}, {status: 400})
      }

      const tokenData={
        id: user._id,
        username: user.username,
        email: user.email
      }

      const token=await jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: "1d"})

      const response=NextResponse.json({
        message: "Longed in successfully",
        success: true
      })

      response.cookies.set("token", token,{
        httpOnly: true, 
        secure:true
      })
      return response;

  } catch (error) {
    return NextResponse.json({error: error.message},
      {status:500}
  );
  }
}