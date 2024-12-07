import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users list
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8 bg-[#e0f7fa] min-h-screen text-[#000000]">
      <div className="flex justify-between items-center mb-6">
        {/* Add User Button on the Left */}
        <button
            className="bg-[#80cbc4] hover:bg-[#4db6ac] text-[#004d40] font-semibold px-5 py-2 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            onClick={() => setSelectedUser({ createdAt: new Date().toISOString() })}
            >
            + Add User
        </button>


        {/* Title Centered */}
        <h2 className="text-3xl font-bold text-[#000000] flex-1 text-center">
          User Management
        </h2>

        {/* Search Input on the Right */}
        <div className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-[#b2dfdb] rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-[#004d40] text-[#ffffff]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created At</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="p-4 border-b border-[#00796b]">{user.name}</td>
                    <td className="p-4 border-b border-[#00796b]">{user.email}</td>
                    <td className="p-4 border-b border-[#00796b]">{user.role}</td>
                    <td className={`p-4 border-b border-[#00796b] ${user.active ? 'text-green-400' : 'text-red-400'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </td>
                    <td className="p-4 border-b border-[#00796b]">{formatDate(user.createdAt)}</td>
                    <td className="p-4 border-b border-[#00796b] text-center">
                      <button
                        className="bg-[#0288d1] hover:bg-[#0277bd] text-white font-medium px-4 py-2 rounded-lg mr-2 transition-transform transform hover:scale-105"
                        onClick={() => setSelectedUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#d32f2f] hover:bg-[#c62828] text-white font-medium px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* User Form Modal */}
      {selectedUser && (
        <UserForm user={selectedUser} onClose={() => setSelectedUser(null)} onRefresh={loadUsers} />
      )}
    </div>
  );
};

export default UserList;
