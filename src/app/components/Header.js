'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [requests, setRequests] = useState([]);

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
        const response = await axios.get(`/api/users/${loggedInUserId}/request`, {
          withCredentials: true,
        });
        setRequests(response.data);
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
      <div className="W-[100%]container px-4 flex justify-between items-center  py-4">
        {/* Logo Section */}
        <div>
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">Mentorship Platform</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
      <div
        className={`md:hidden fixed inset-0 h-fit w-1/2 bg-blue-700 bg-opacity-95 transform py-2 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <nav className="flex flex-col items-center justify-center space-y-2 h-full">
          {[
            { href: "/", label: "Home" },
            { href: "/discover", label: "Discover" },
            { href: "/matchmaking", label: "Matches" },
            { href: "/profile", label: "Profile" },
            { href: "/profile/connections", label: "Connected" },
            { href: "/profile/requests", label: "Requests" },
            { href: loggedInUserId ? "/logout" : "/login", label: loggedInUserId ? "Logout" : "Login" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-lg text-white hover:underline"
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
