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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse bg-gray-300 h-12 w-48 rounded"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">{user.username}&apos;s Profile</h1>
          <p className="text-xl text-gray-600">{user.role}</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Username:</p>
            <p className="text-gray-600">{user.username}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-gray-600">{user.about || 'No information provided'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Skills:</p>
            <p className="text-gray-600">{user.skills.length ? user.skills.join(', ') : 'No skills added'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Interests:</p>
            <p className="text-gray-600">{user.interests.length ? user.interests.join(', ') : 'No interests added'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Gender:</p>
            <p className="text-gray-600">{user.gender}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
