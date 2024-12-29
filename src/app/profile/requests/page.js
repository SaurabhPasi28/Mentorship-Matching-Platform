"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Fetch logged-in user ID
  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get("/api/users", { withCredentials: true });
        setLoggedInUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching logged-in user ID:", error.response?.data?.message || error.message);
      }
    };

    fetchLoggedInUserId();
  }, []);

  // Fetch requests once the user ID is available
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/api/users/${loggedInUserId}/request`, { withCredentials: true });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error.response?.data?.message || error.message);
      }
    };

    fetchRequests();
  }, [loggedInUserId]);

  const handleRequestAction = async (requesterId, action) => {
    try {
      await axios.post(
        `/api/users/${requesterId}/connection`,
        { action },
        { withCredentials: true }
      );
      setStatus(action === "accept" ? "Request accepted!" : "Request rejected!");
      setRequests((prev) => prev.filter((req) => req._id !== requesterId));
    } catch (error) {
      console.error("Error managing request:", error.response?.data?.message || error.message);
      setStatus("Failed to process request.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Manage Requests</h1>

      {status && <p className="text-sm mb-4 text-center text-gray-700">{status}</p>}

      {requests.length > 0 ? (
        <ul>
          {requests.map((user) => (
            <li key={user._id} className="flex flex-col sm:flex-row  items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg hover:shadow-md transition-all">
              <div className="sm:flex gap-2">
                <div className="relative w-40 h-40 sm:w-32 sm:h-32 mb-4 overflow-hidden">
                  <Image
                    src={user.profilePicture || "/default-image.png"}
                    alt="User Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                <p className="font-semibold text-lg text-gray-800">{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-4 ms:mt-0 gap-8">
                <button
                  onClick={() => handleRequestAction(user._id, "accept")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequestAction(user._id, "reject")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No pending requests.</p>
      )}
    </div>
  );
}
