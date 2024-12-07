import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-[#4db6ac] p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/user-dashboard" className="hover:text-gray-200">User Dashboard</Link>
        </div>
        <div>
          <button
            onClick={onLogout}
            className="text-white bg-[#0288d1] hover:bg-[#0277b3] py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
