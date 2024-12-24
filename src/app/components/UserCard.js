'use client';

import { useState } from "react";
import axios from "axios";

function UserCard({ user }) {
  const [status, setStatus] = useState("");

  // Send request function
  const sendRequest = async () => {
    try {
      await axios.post("/api/matchmaking", { receiverId: user._id, message: "I want to connect with you." });
      setStatus("Request sent!");
    } catch (error) {
      setStatus("Error");
    }
  };

  return (
    <div className="flex w-4/5 justify-between border items-center p-4 ">
        <div>
            <h2 className="font-bold">{user.username}</h2>
            <p>Role: {user.role}</p>
            <p>Skills: {user.skills.join(", ")}</p>
            <p>Interests: {user.interests.join(", ")}</p>
        </div>
        <div className="text-center">
            <button onClick={sendRequest} className="bg-blue-500 text-white px-4 py-2 h-fit rounded">
                Send Request
            </button>
        
            {status && <p>{status}</p>}
        </div>
    </div>
  );
}

export default UserCard;
