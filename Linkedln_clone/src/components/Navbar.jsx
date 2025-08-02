import React, { useState, useContext } from 'react';
import { HiMenu, HiX, HiHome, HiBell } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-700 text-white px-6 md:px-20 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold cursor-pointer select-none"
        >
          <span className="text-blue-400">Linked</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2496/2496097.png"
            alt="Linked logo"
            className="h-8 w-8"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 text-gray-800 rounded-sm h-10 px-4 outline-none"
          />
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-2xl">
          <Link to="/">
            <HiHome className="hover:text-blue-400 transition" title="Home" />
          </Link>
          <HiBell className="hover:text-blue-400 transition cursor-pointer" title="Notifications" />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-6 items-center text-lg font-medium">
          {user ? (
            <>
              <span className="text-white">Hi, {user.userName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-lg font-medium">
          {user ? (
            <>
              <span className="text-white px-2">Hi, {user.userName}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
