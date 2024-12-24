"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch the user data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('/api/users/profile');
        setUser(response.data.data);
        setFormData(response.data.data); // Pre-fill the form with user data
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value.split(',').map((item) => item.trim()) });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/users/profile', formData);
      console.log("Profile updated:", response.data);
      setUser(response.data.data);
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl transform transition-all duration-500 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 text-lg">Manage your profile and preferences</p>
        </div>

        {isEditing ? (
          // Editable form
          <form className="space-y-6">
            <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <label className="block font-semibold text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
                <div className="flex-1">
                  <label htmlFor="gender" className="block font-semibold text-gray-700">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label htmlFor="role" className="block font-semibold text-gray-700">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleInputChange}
                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills?.join(', ') || ''}
                  onChange={(e) => handleArrayInputChange('skills', e.target.value)}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Interests</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests?.join(', ') || ''}
                  onChange={(e) => handleArrayInputChange('interests', e.target.value)}
                  className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // View profile
          <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-user text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Username</p>
                <p className="text-lg text-gray-600">{user.username}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4 ">
              <i className="fas fa-envelope text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Email</p>
                <p className="text-lg text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-info-circle text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Bio</p>
                <p className="text-lg text-gray-600">{user.bio || 'N/A'}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-genderless text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Gender</p>
                <p className="text-lg text-gray-600">{user.gender}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-user-tag text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Role</p>
                <p className="text-lg text-gray-600">{user.role}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-tools text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Skills</p>
                <p className="text-lg text-gray-600">{user.skills.length ? user.skills.join(', ') : 'N/A'}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
              <i className="fas fa-heart text-blue-600"></i>
              <div>
                <p className="text-lg font-bold text-gray-700">Interests</p>
                <p className="text-lg text-gray-600">{user.interests.length ? user.interests.join(', ') : 'N/A'}</p>
              </div>
            </div>
          </div>
        
          <div className="mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
}
