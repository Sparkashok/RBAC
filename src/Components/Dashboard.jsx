import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchRoles } from '../services/api';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const usersResponse = await fetchUsers();
        const rolesResponse = await fetchRoles();

        setUserCount(usersResponse.data.length);
        setRoleCount(rolesResponse.data.length);

        // Ensure the 'timestamp' field exists in the user data
        setRecentUsers(usersResponse.data.slice(-5).reverse());
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-800">Loading...</div>;
  }

  return (
    <div className="p-6 w-full min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#9fe2bf] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-5xl font-bold">{userCount}</p>
        </div>
        <div className="bg-[#add8e6] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Roles</h2>
          <p className="text-5xl font-bold">{roleCount}</p>
        </div>
        <div className="bg-[#9fe2bf] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Active Users</h2>
          <p className="text-5xl font-bold">{Math.floor(userCount * 0.8)}</p>
        </div>
        <div className="bg-[#add8e6] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="text-5xl font-bold">{Math.floor(userCount * 0.1)}</p>
        </div>
      </div>

      {/* Recent Users List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#9fe2bf] text-gray-700">
              <th className="p-3 border-b border-gray-300">Name</th>
              <th className="p-3 border-b border-gray-300">Email</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#f0f8ff] transition">
                <td className="p-3 border-b border-gray-300">{user.name}</td>
                <td className="p-3 border-b border-gray-300">{user.email}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
