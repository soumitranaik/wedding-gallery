"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "./ui/moving-border";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div></div>
      <nav className="bg-black fixed px-10 py-6 top-0 right-0 z-50 mr-36 mt-8 rounded-full border border-neutral-800 dark:border-white/[0.2] ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold"></div>
          <div className="hidden md:flex space-x-6">
            <div></div>
            <Link href="/">Pre-wedding</Link>
            <Link href="/mehendi">Mehendi</Link>
            <Link href="/pranjali-haldi">Pranjali Haldi</Link>
            <Link href="/soumitra-haldi">Soumitra Haldi</Link>
            <Link href="/wedding">Wedding</Link>
            <Link href="/video">Video</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="flex flex-col space-y-2">
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
            </div>
          </div>
        )}
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-600 to-transparent  h-px" />
      </nav>
    </>
  );
};

export default Navbar;
