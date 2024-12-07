import React, { useState, useEffect } from 'react';
import { addUser, updateUser, fetchRoles } from '../services/api';

const UserForm = ({ user, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    role: user?.role ?? '',
    active: user?.active ?? true,
    createdAt: user?.createdAt ?? new Date().toISOString(),
    password: '', // Always initialize password to an empty string
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await fetchRoles();
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    loadRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, active: e.target.checked });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateRole = (role) => {
    return roles.some((r) => r.name.toLowerCase() === role.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validateRole(formData.role)) {
      setError('The specified role does not exist.');
      return;
    }

    try {
      if (user && user.id) {
        await updateUser({ ...formData, password: formData.password || undefined });
      } else {
        await addUser(formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save user. Please try again.');
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#e0f7fa] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-[#004d40] mb-4">
          {user && user.id ? 'Edit User' : 'Add User'}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border border-gray-300 text-black p-2 mb-3 w-full rounded-md"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border border-gray-300 text-black p-2 mb-3 w-full rounded-md"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
            className="border border-gray-300 text-black p-2 mb-3 w-full rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 text-black p-2 mb-3 w-full rounded-md"
          />
          <label className="flex items-center mb-4 text-[#004d40] font-medium">
            Active:
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleCheckboxChange}
              className="ml-2"
            />
          </label>

          {formData.createdAt && (
            <p className="mb-4 text-sm text-[#004d40]">
              Created At: <span className="font-medium">{new Date(formData.createdAt).toLocaleString()}</span>
            </p>
          )}

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#80cbc4] hover:bg-[#4db6ac] text-[#004d40] font-semibold px-4 py-2 rounded-lg mr-2 transition-transform transform hover:scale-105"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#b3e5fc] hover:bg-[#81d4fa] text-[#01579b] font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
