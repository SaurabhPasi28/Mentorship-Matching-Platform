"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  // console.log("_____________>")
  // Fetch logged-in user ID
  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get("/api/users", { withCredentials: true });
        // console.log("_____________>",response)
        setLoggedInUserId(response.data.userId); // Assuming `userId` is returned
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Requests</h1>

      {status && <p className="text-sm mb-4">{status}</p>}

      {requests.length > 0 ? (
        <ul>
          {requests.map((user) => (
            <li key={user._id} className="mb-4 border-b pb-4">
              <p>
                <strong>{user.username}</strong> ({user.email})
              </p>
              <button
                onClick={() => handleRequestAction(user._id, "accept")}
                className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleRequestAction(user._id, "reject")}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
