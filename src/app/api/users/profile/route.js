import { dbconnect } from "@/dbConfig/dbconnect";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse} from "next/server";

dbconnect();

export async function POST(request){
  //extract data from  token 
  const userId= await getDataFromToken(request);
  const user= await User.findOne(userId).select("-password");
  return NextResponse.json({
    message: "User Found",
    data: user
  })
}
