// // "use client"
// // import React, { useState } from 'react'
// // import Link from 'next/link'
// // import axios from 'axios'
// // import toast from 'react-hot-toast'
// // import { useRouter } from 'next/navigation'

// // export default function ProfilePage() {
// //   const router = useRouter()
  
// //   const [data,setData]=useState("");

// //   const getUserDetails = async()=>{
// //     try {
// //       console.log("---------->firt try")
// //       const res = await axios.post("/api/users/profile")
// //       console.log(res.data.data);
// //       setData(res.data.data._id);
// //     } catch (error) {
// //       console.log(error)
// //       toast.error(error.message)
// //     }
// //   }
// //   const logOut = async()=>{
// //     try {
// //       await axios.get("/api/users/logout")
// //       toast.success("Logout successfully")
// //       console.log("Logout successfully")
// //       router.push("/login")
// //     } catch (error) {
// //       console.log(error.message)
// //       toast.error(error.message)
// //     }
// //   }
// //   return (

// //     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
// //       <h1>Profile Page</h1>
// //       <hr/>
// //       <h2> {data=== "" ? "Nothing": <Link href={`/profile/${data}`}>tetst{data}</Link>}</h2>
// //       <hr/>
// //       <button className='' 
// //       onClick={logOut}>Logout

// //       </button>
    
// //       <button className='' 
// //       onClick={getUserDetails}>
// //         Get User Details
// //       </button>
// //     </div>
// //   )
// // }


// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [data, setData] = useState(null); // Use null for uninitialized state

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.post("/api/users/profile");
//       if (res.data.data) {
//         setData(res.data.data._id); // Assuming the user has an '_id'
//       } else {
//         toast.error("No user data found.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || error.message || "Failed to fetch user details.");
//     }
//   };

//   const logOut = async () => {
//     try {
//       await axios.get("/api/users/logout");
//       toast.success("Logged out successfully.");
//       router.push("/login");
//     } catch (error) {
//       toast.error(error.message || "Logout failed.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-xl font-semibold mb-4">Profile Page</h1>
//       <hr className="my-4" />
//       {data === null ? (
//         <h2>No user data available. Please login again.</h2>
//       ) : (
//         <h2>
//           <Link href={`/profile/${data}`} className="text-blue-500 hover:text-blue-700">
//             View Profile: {data}
//           </Link>
//         </h2>
//       )}
//       <hr className="my-4" />
//       <div className="flex space-x-4">
//         <button
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//           onClick={logOut}
//         >
//           Logout
//         </button>
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           onClick={getUserDetails}
//         >
//           Get User Details
//         </button>
//       </div>
//     </div>
//   );
// }


// src/app/profile/page.js
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch the user data when the component mounts
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get('/api/users/profile');
//         setUser(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold">Profile</h1>
//       <hr />
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//       <button
//         onClick={() => router.push('/')}
//         className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//       >
//         Go Home
//       </button>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch the user data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('/api/users/profile');
        setUser(response.data.data);
        setFormData(response.data.data); // Pre-fill the form with user data
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/users/profile', formData);
      setUser(response.data.data);
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Profile</h1>
      <hr />

      {isEditing ? (
        // Editable form
        <form className="w-full max-w-md space-y-4">
          <div>
            <label className="block font-semibold">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Interests:</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Availability:</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        // Display user profile
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Skills:</strong> {user.skills || "N/A"}</p>
          <p><strong>Interests:</strong> {user.interests || "N/A"}</p>
          <p><strong>Availability:</strong> {user.availability || "N/A"}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
