// "use client";

// import React, { useState } from "react";
// import axios from "axios";

// const UploadPage = () => {
//   const [image, setImage] = useState(null);
//   const [status, setStatus] = useState("");

//   const onChangeHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       setStatus("Please select an image before uploading.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await axios.post("/api/uploadprofile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setStatus(response.data.message || "Image uploaded successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error.message);
//       setStatus("Failed to upload image.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={onSubmitHandler} className="space-y-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onChangeHandler}
//           className="border border-gray-300 p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Upload
//         </button>
//       </form>
//       {status && <p className="mt-2">{status}</p>}
//     </div>
//   );
// };

// export default UploadPage;
