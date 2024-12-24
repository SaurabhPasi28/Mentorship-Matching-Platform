"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [requests, setRequests] = useState([]); // State to store requests

  // Fetch logged-in user ID
  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get("/api/users", { withCredentials: true });
        setLoggedInUserId(response.data.userId);
      } catch (error) {
        console.error(
          "Error fetching logged-in user ID:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchLoggedInUserId();
  }, []);

  // Fetch requests and update notification count
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/api/users/${loggedInUserId}/request`, { withCredentials: true });
        setRequests(response.data); // Update requests state
      } catch (error) {
        console.error(
          "Error fetching requests:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchRequests();
  }, [loggedInUserId]);

  // Update notification count whenever requests change
  useEffect(() => {
    setNotificationCount(requests.length);
  }, [requests]);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50 font-bold text-xl">
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mr-1" />
          <span className="text-lg font-bold">Mentorship Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/discover" className="hover:underline">
            Discover
          </Link>
          <Link href="/matchmaking" className="hover:underline">
            Matches
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/profile/connections" className="hover:underline">
            Connected
          </Link>
          <Link href="/profile/requests" className="hover:underline">
            Requests
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-1 text-sm">
                {notificationCount}
              </span>
            )}
          </Link>
          {loggedInUserId ? (
            <Link href="/logout" className="hover:underline">
              Logout
            </Link>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-700">
          <Link href="/" className="block px-4 py-1 hover:bg-blue-500">
            Home
          </Link>
          <Link href="/discover" className="block px-4 py-1 hover:bg-blue-500">
            Discover
          </Link>
          <Link href="/matchmaking" className="block px-4 py-1 hover:bg-blue-500">
            Matches
          </Link>
          <Link href="/profile" className="block px-4 py-1 hover:bg-blue-500">
            Profile
          </Link>
          <Link href="/profile/connections" className="block px-4 py-1 hover:bg-blue-500">
            Connected
          </Link>
          <Link href="/profile/requests" className="block px-4 py-1 hover:bg-blue-500">
            Requests
          </Link>
          {loggedInUserId ? (
            <Link href="/logout" className="block px-4 py-1 hover:bg-blue-500">
              Logout
            </Link>
          ) : (
            <Link href="/login" className="block px-4 py-1 hover:bg-blue-500">
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
