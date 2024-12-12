'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function DiscoverPage() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ role: "", skills: "", interests: "" });

    const fetchUsers = async () => {
        try {
            const { role, skills, interests } = filters;
            const query = new URLSearchParams({
                ...(role && { role }),
                ...(skills && { skills }),
                ...(interests && { interests }),
            }).toString();

            const response = await axios.get(`/api/discover?${query}`);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filters]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Discover Users</h1>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Role"
                    className="border p-2"
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Skills (comma-separated)"
                    className="border p-2"
                    value={filters.skills}
                    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Interests (comma-separated)"
                    className="border p-2"
                    value={filters.interests}
                    onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
                />
                <button className="bg-blue-500 text-white p-2 rounded" onClick={fetchUsers}>
                    Apply Filters
                </button>
            </div>
            <div>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="border p-4 mb-2">
                            <h2 className="font-bold">{user.username}</h2>
                            <p>Role: {user.role}</p>
                            <p>Skills: {user.skills.join(", ")}</p>
                            <p>Interests: {user.interests.join(", ")}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
}
