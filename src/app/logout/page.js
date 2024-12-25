'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get('/api/users/logout', { withCredentials: true });
        if (response.data.success) {
          toast.success(response.data.message || 'Logged out successfully!');
          router.push('/login'); // Redirect to login page after logout
        } else {
          throw new Error(response.data.error || 'Logout failed');
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred during logout');
        router.push('/'); 
        window.location.reload();// Redirect to login page even on error
      }
    };

    logoutUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-semibold text-gray-700">Logging you out...</h1>
    </div>
  );
}
