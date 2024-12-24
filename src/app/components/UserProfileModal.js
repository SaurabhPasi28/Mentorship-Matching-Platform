import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfileModal({ userId, isOpen, closeModal }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [userId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 max-w-full relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {user && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{user.username}'s Profile</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>About:</strong> {user.about || 'No information provided'}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Skills:</strong> {user.skills.length ? user.skills.join(', ') : 'No skills added'}</p>
              <p><strong>Interests:</strong> {user.interests.length ? user.interests.join(', ') : 'No interests added'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
