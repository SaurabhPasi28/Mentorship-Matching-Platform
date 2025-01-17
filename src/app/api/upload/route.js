import { uploadToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    const fileBuffer = await file.arrayBuffer();


    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const response = await uploadToCloudinary(fileUri, file.name);
 
    if (response.success && response.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: response.result.secure_url,
      });
    }

    return NextResponse.json({ message: "failure", error: response.error });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
