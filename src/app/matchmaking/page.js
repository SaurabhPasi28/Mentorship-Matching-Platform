'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function MatchmakingPage() {
    const [matches, setMatches] = useState([]);

    const fetchMatches = async () => {
        try {
            const response = await axios.get('/api/matchmaking');
            setMatches(response.data.matches);
        } catch (error) {
            console.error("Error fetching matches:", error.message);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Matchmaking</h1>
            <div>
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <div key={match._id} className="border p-4 mb-2">
                            <h2 className="font-bold">{match.username}</h2>
                            <p>Role: {match.role}</p>
                            <p>Skills: {match.skills.join(", ")}</p>
                            <p>Interests: {match.interests.join(", ")}</p>
                        </div>
                    ))
                ) : (
                    <p>No matches found</p>
                )}
            </div>
        </div>
    );
}
