'use client'

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  return (
    <nav className="text-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl text-blue-600 font-bold">
          <Link href="/">FinTrack</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/overview" className="hover:text-gray-300">
            Overview
          </Link>
          <Link href="/transactions" className="hover:text-gray-300">
            Transactions
          </Link>
          <Link href="/budget" className="hover:text-gray-300">
            Budget
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white p-4 space-y-4">
          <Link href="/" className="block hover:text-gray-300">
            Home
          </Link>
          <Link href="/overview" className="block hover:text-gray-300">
            Overview
          </Link>
          <Link href="/transactions" className="block hover:text-gray-300">
            Transactions
          </Link>
          <Link href="/budget" className="block hover:text-gray-300">
            Budget
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
