// import { parseForm } from "@/utils/formidable";
// import { uploadToCloudinary } from "@/utils/cloudinary";
// import fs from "fs/promises";

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing to handle form-data
//   },
// };

// export async function POST(req) {
//   try {
//     // Parse the form-data to extract file
//     const { files } = await parseForm(req);

//     if (!files.image) {
//       return new Response(
//         JSON.stringify({ success: false, message: "No file uploaded" }),
//         { status: 400 }
//       );
//     }

//     const filePath = files.image.filepath;

//     // Upload file to Cloudinary
//     const cloudinaryResponse = await uploadToCloudinary(filePath, "Mentorship-profile");

//     // Clean up temporary file
//     await fs.unlink(filePath);

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "File uploaded successfully",
//         data: cloudinaryResponse,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error during file upload:", error.message);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500 }
//     );
//   }
// }
