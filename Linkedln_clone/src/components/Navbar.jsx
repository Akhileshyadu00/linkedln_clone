import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white px-6 md:px-20 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <Link to={"/"} className="flex items-center gap-2 text-3xl font-bold cursor-pointer select-none">
          <span className="text-blue-400">Linked</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2496/2496097.png"
            alt="Linked logo"
            className="h-8 w-8"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center text-lg font-medium">
          <Link to={"/login"} href="#" className="hover:text-blue-400 transition-all duration-300">
            Sign In
          </Link>
          <Link
            to={"/register"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="text-3xl" />
            ) : (
              <HiMenu className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-lg font-medium">
          <Link
           to={"/register"}
            className="hover:text-blue-400 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
           to={"/register"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
