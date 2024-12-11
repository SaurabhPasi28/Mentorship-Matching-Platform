'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50 font-bold text-xl ">
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="mr-1"
          />
          <span className="text-lg font-bold">Mentorship Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/browse" className="hover:underline">Browse</Link>
          <Link href="/matches" className="hover:underline">Matches</Link>
          {/* <Link href="/profile" className="hover:underline">Profile</Link> */}
          <Link href="/login" className="hover:underline">Login</Link>
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
          <Link href="/browse" className="block px-4 py-1 hover:bg-blue-500">
            Browse
          </Link>
          <Link href="/matches" className="block px-4 py-1 hover:bg-blue-500">
            Matches
          </Link>
          <Link href="/profile" className="block px-4 py-1 hover:bg-blue-500">
            Profile
          </Link>
          <Link href="/login" className="block px-4 py-1 hover:bg-blue-500">
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
