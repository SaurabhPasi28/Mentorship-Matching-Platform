'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import SendRequestButton from "@/app/components/SendRequestButton";
import { motion } from "framer-motion";
import Loading from "../loading";
import Image from "next/image";

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
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto p-2 ms:p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Your Matches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches && matches.length > 0 ? (
          matches.map((match) => (
            <div
              key={match._id}
              className="bg-gray-200 shadow-xl rounded-xl p-2 sm:p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <div className="flex w-full ">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 overflow-hidden">
                <Image
                  src={match.profilePicture || "/default-image.png"}
                  alt="User Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
             <div className="px-2">
             <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {match.username}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {match.bio || "No bio available"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Role:</strong> {match.role.charAt(0).toUpperCase() + match.role.slice(1)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Skills:</strong> {match.skills.join(", ")}
              </p>
             </div>
              </div>
              <div className="flex w-full justify-between">
                <Link
                  href={`/profile/${match._id}`}
                  className="px-4 py-2 h-fit bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
                >
                  View Profile
                </Link>
                <SendRequestButton targetUserId={match._id} />
              </div>
            </div>
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
