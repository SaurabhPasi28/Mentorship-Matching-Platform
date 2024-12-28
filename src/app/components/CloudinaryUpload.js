"use client"
import { useState } from "react";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const UploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("working till here>>>>>>>>>>1")
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      // console.log("working till here>>>>>>>>>>2")
      const data = await response.json();
  
      if (data.message === "success") {
        console.log("Uploaded Image URL:", data.imgUrl);
        return data.imgUrl;
      } else {
        console.error("Upload Failed:---->", data.error || data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const url = await UploadImage(selectedFile);
      setImageUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
    {/* Custom file input label */}
    <label
      htmlFor="file-upload"
      className="cursor-pointer bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-200"
    >
      Choose Image
    </label>

    {/* Hidden file input */}
    <input
      id="file-upload"
      type="file"
      onChange={handleFileChange}
      className="hidden"
    />

    {/* Upload button */}
    <button
      onClick={handleUpload}
      className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-200"
    >
      Upload
    </button>

    {/* Display uploaded image */}
    {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4 max-w-full rounded-lg shadow-md" />}
  </div>
  );
};

export default ImageUploader;
