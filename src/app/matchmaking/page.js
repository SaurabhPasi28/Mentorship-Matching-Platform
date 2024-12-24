'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import SendRequestButton from "@/app/components/SendRequestButton";
import { motion } from "framer-motion";
import Loading from "../loading";

export default function MatchmakingPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchMatches = async () => {
    try {
      const response = await axios.get("/api/matchmaking");
      setMatches(response.data.matches);
      setLoading(false);
    } catch (err) {
      setError("Error fetching matches."); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(); 
  }, []);

  if (loading)
    return (
      <p>
        <Loading/>
      </p>
    ); 

  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-600">
        {error}
      </p>
    ); // Show error if something went wrong

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Your Matches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches && matches.length > 0 ? (
          matches.map((match) => (
            <motion.div
              key={match._id}
              className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {match.username}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{match.bio || "No bio available"}</p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Role:</strong> {match.role.charAt(0).toUpperCase() + match.role.slice(1)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Skills:</strong> {match.skills.join(", ")}
              </p>
              <div className="flex justify-between">
              <Link href={`/profile/${match._id}`} className="px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                View Profile
              </Link>
                  <SendRequestButton targetUserId={match._id} />
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No matches found.
          </p>
        )}
      </div>
    </div>
  );
}
