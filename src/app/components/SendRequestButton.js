"use client";

import axios from "axios";
import { useState } from "react";

export default function SendRequestButton({ targetUserId }) {
  const [status, setStatus] = useState("");

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(`/api/users/${targetUserId}/request`, {}, {
        withCredentials: true, // Include cookies for authentication
      });
      setStatus("Request sent successfully");
    } catch (error) {
      // console.error("Error sending request:", error.response?.data?.message || error.message);
      setStatus(error.response.data.message );
    }
  };

  return (
    <div>
      <button
        onClick={handleSendRequest}
        className="px-4 py-2 h-fit bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Send Request
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}