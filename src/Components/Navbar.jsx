import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
        <ul className="flex space-x-8 items-center">
          <li>
            <Link
              to="/"
              className={`text-lg px-4 py-2 rounded transition duration-300 ${
                isActive('/') ? 'bg-blue-600 text-white' : 'hover:bg-blue-500 hover:text-white'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`text-lg px-4 py-2 rounded transition duration-300 ${
                isActive('/users') ? 'bg-green-600 text-white' : 'hover:bg-green-500 hover:text-white'
              }`}
            >
              User Management
            </Link>
          </li>
          <li>
            {/* <Link
              to="/roles"
              className={`text-lg px-4 py-2 rounded transition duration-300 ${
                isActive('/roles') ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 hover:text-white'
              }`}
            >
              Role Management
            </Link> */}
          </li>
          <li>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-4 py-2 rounded transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
