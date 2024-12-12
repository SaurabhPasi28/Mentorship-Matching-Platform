'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MentorDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch mentor's mentorship requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/mentors');
        setRequests(response.data.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to fetch requests');
      }
    };

    fetchRequests();
  }, []);

  const handleResponse = async (requestId, status) => {
    setLoading(true);
    try {
      const response = await axios.put('/api/mentors', { requestId, status });
      toast.success(`Request ${status} successfully`);
      // Update requests after mentor's response
      setRequests(
        requests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Mentor Dashboard</h1>

      <div className="w-full max-w-md space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="flex justify-between items-center p-4 border rounded-md">
              <span>Mentee: {request.mentee.username}</span>
              <span>Status: {request.status}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleResponse(request._id, 'accepted')}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  disabled={loading || request.status !== 'pending'}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(request._id, 'rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  disabled={loading || request.status !== 'pending'}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No incoming requests.</p>
        )}
      </div>
    </div>
  );
}
