'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios";
import SendRequestButton from "@/app/components/SendRequestButton"; // Import the button
import Loading from "../loading";
import Image from "next/image";

export default function DiscoverPage() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ role: "", skills: "", interests: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch users with applied filters
    const fetchUsers = async () => {
        try {
            const { role, skills, interests } = filters;
            const query = new URLSearchParams({
                ...(role && { role }),
                ...(skills && { skills }),
                ...(interests && { interests }),
            }).toString();

            const response = await axios.get(`/api/discover?${query}`);
            setUsers(response.data.users); // Assuming the response contains `users`
            setLoading(false);
        } catch (err) {
            setError("Error fetching users.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on initial load
    }, [filters]);

    if (loading) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent mb-6">
                Discover Users
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap justify-start gap-6 mb-6">
                <input
                    type="text"
                    placeholder="Role"
                    className="border p-3 rounded-lg shadow-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Skills (comma-separated)"
                    className="border p-3 rounded-lg shadow-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={filters.skills}
                    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Interests (comma-separated)"
                    className="border p-3 rounded-lg shadow-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={filters.interests}
                    onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
                />
                <button
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                    onClick={fetchUsers}
                >
                    Apply Filters
                </button>
            </div>

            {/* Displaying Users */}
            <div className="flex flex-wrap justify-evenly sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {users.length > 0 ? (
    users.map((user) => (
      <div
        key={user._id}
        className="bg-white border w-96 p-2 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
       <div className="flex flex-col w-full bg-white border p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-in-out">
  {/* Image Section - Left Side */}
  <div className="flex">
  <div className="flex-shrink-0 relative w-28 h-40 sm:32 sm:32 md:w-40 md:h-40 overflow-hidden rounded-md">
    <Image
      src={user.profilePicture || "/default-image.png"} // Fallback to default image
      alt="User Profile Picture"
      layout="fill"
      objectFit="cover"
      className="rounded-md"
    />
  </div>

  {/* Details Section - Right Side */}
  <div className="flex flex-col flex-grow ml-6 sm:ml-6 mt-0">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{user.username}</h2>
    <p className="text-sm sm:text-base text-gray-600 mt-1">{user.bio || "No bio available"}</p>

    <div className="mt-3 text-sm sm:text-base text-gray-600 space-y-1">
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Skills:</strong> {user.skills.join(", ") || "None"}
      </p>
      <p>
        <strong>Interests:</strong> {user.interests.join(", ") || "None"}
      </p>
    </div>

    {/* Button Group */}
  </div>
  </div>
    <div className="mt-4 flex justify-between">
      <Link
        href={`/profile/${user._id}`}
        className="px-4 py-2 h-fit text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        View Profile
      </Link>
      <SendRequestButton targetUserId={user._id} />
    </div>
</div>

      </div>
    ))
  ) : (
    <p className="text-center text-lg text-gray-600">No users found</p>
  )}
</div>


        </div>
    );
}
