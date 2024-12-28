import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("working till here>>>>>>>>>>10")

export const uploadToCloudinary = (fileUri, fileName) => {
  console.log("working till here>>>>>>>>>>12")
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "mentorship-profile",
        use_filename: true,
      })
      .then((result) => resolve({ success: true, result }))
      .catch((error) => reject({ success: false, error }));
  });
};