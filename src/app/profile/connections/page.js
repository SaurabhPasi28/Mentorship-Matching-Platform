'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // For navigation to user profiles

export default function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Fetch logged-in user ID
  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get('/api/users', { withCredentials: true });
        setLoggedInUserId(response.data.userId); // Assuming `userId` is returned
      } catch (error) {
        console.error('Error fetching logged-in user ID:', error.response?.data?.message || error.message);
      }
    };

    fetchLoggedInUserId();
  }, []);

  // Fetch connections only when loggedInUserId is available
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchConnections = async () => {
      try {
        const response = await axios.get(`/api/users/${loggedInUserId}/connection`, { withCredentials: true });
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching connections:', error.response?.data?.message || error.message);
      }
    };

    fetchConnections();
  }, [loggedInUserId]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Connections</h1>

        {connections.length > 0 ? (
          <div className="space-y-6">
            {connections.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100 rounded-lg p-4 shadow-md hover:scale-105 transform transition duration-300 ease-out"
              >
                <div className="flex items-center space-x-4">
                  {/* User Avatar */}
                  <img
                    src={user.avatar || '/default-avatar.png'} // Use default if no avatar is present
                    alt={user.username}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <Link href={`/profile/${user._id}`} className="text-xl font-semibold text-indigo-600 hover:underline">
                      {user.username}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                    <p className="text-sm text-gray-500 mt-2">{user.about || 'No bio available'}</p>
                    {/* <p className="text-sm text-gray-600 mt-2">
                      <strong className="text-gray-700">Skills:</strong> {user.skills.length ? user.skills.join(', ') : 'No skills listed'}
                    </p> */}
                  </div>
                </div>

                <div className="space-x-4 flex items-center">
                  {/* View Profile Button */}
                  <Link
                    href={`/profile/${user._id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    View Profile
                  </Link>

                  {/* Message Button (Example placeholder for future features) */}
                  {/* <button
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                  >
                    Message
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 text-center">You have no connections yet.</p>
        )}
      </div>
    </div>
  );
}
