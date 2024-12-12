'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MenteeDashboard() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch list of mentors
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/api/mentors');
        setMentors(response.data.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        toast.error('Failed to fetch mentors');
      }
    };

    // Fetch mentee's mentorship requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/mentees');
        setRequests(response.data.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to fetch requests');
      }
    };

    fetchMentors();
    fetchRequests();
  }, []);

  const handleRequestMentorship = async () => {
    if (!selectedMentor) {
      toast.error('Please select a mentor');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/mentees', { mentorId: selectedMentor });
      toast.success('Mentorship request sent successfully');
      setRequests([...requests, response.data.data]);
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      toast.error('Failed to send mentorship request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Mentee Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Select a Mentor</h2>
        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.username}
            </option>
          ))}
        </select>
        <button
          onClick={handleRequestMentorship}
          disabled={loading || !selectedMentor}
          className={`mt-4 px-4 py-2 rounded ${
            loading || !selectedMentor
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      <h2 className="text-xl mb-2">Your Requests</h2>
      <div className="w-full max-w-md space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="flex justify-between items-center p-4 border rounded-md">
              <span>Mentor: {request.mentor.username}</span>
              <span>Status: {request.status}</span>
            </div>
          ))
        ) : (
          <p>No mentorship requests yet.</p>
        )}
      </div>
    </div>
  );
}
