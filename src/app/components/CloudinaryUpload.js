import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import axios from 'axios';

const CloudinaryUpload = () => {
  const [publicId, setPublicId] = useState("");

  const handleUploadSuccess = async ({ event, info }) => {
    if (event === "success") {
      console.log("Cloudinary public_id:------------->", info.public_id);
      setPublicId(info.public_id);

      // Send the public_id to your backend to save it in MongoDB
      try {
        const response = await axios.put('/api/users/profile', {
          profilePicture: info.public_id,
        });

        if (response.status === 200) {
          alert('Profile image updated successfully!');
        }
      } catch (error) {
        console.error('Error saving public_id to backend:', error);
        alert('Failed to update profile image.');
      }
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="hcnfq5ko"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => (
        <button onClick={() => open()}>
          Upload an Image
        </button>
      )}
    </CldUploadWidget>
  );
};

export default CloudinaryUpload;
