'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/app/components/UserCard"; // Assuming the UserCard component

export default function MatchmakingPage() {
  const [matches, setMatches] = useState([]); // State to hold the list of matches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch matches from the API
  const fetchMatches = async () => {
    try {
      const response = await axios.get("/api/matchmaking"); // API endpoint for matchmaking
      setMatches(response.data.matches); // Update state with the list of matches
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError("Error fetching matches."); // Handle error and update state
      setLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    fetchMatches(); // Fetch matches when the component mounts
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state while data is being fetched
  if (error) return <p>{error}</p>; // Show error if something went wrong

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Matches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches && matches.length > 0 ? (
          matches.map((match) => (
            <UserCard key={match._id} user={match} /> // Render each match using UserCard component
          ))
        ) : (
          <p>No matches found</p> // Message if no matches are found
        )}
      </div>
    </div>
  );
}


