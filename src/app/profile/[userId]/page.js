'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserProfilePage({ params }) {
  const { userId } = params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${userId}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-pulse bg-blue-300 h-12 w-48 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl transition transform hover:scale-105 duration-300 ease-in-out p-8 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt="Profile Picture"
            className="w-48 h-48 rounded-full shadow-lg ring-4 ring-indigo-300"
          />
          <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
          <p className="text-lg font-medium text-gray-600 capitalize">{user.role}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">Username</p>
            <p className="text-gray-600">{user.username}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">Email</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">About</p>
            <p className="text-gray-600">{user.about || 'No information provided'}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">Skills</p>
            <p className="text-gray-600">{user.skills.length ? user.skills.join(', ') : 'No skills added'}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">Interests</p>
            <p className="text-gray-600">{user.interests.length ? user.interests.join(', ') : 'No interests added'}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            <p className="font-semibold">Gender</p>
            <p className="text-gray-600 capitalize">{user.gender}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
