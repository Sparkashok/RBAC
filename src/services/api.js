// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchRoles = () => axios.get(`${API_URL}/roles`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (user) => axios.put(`${API_URL}/users/${user.id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
export const addRole = (role) => axios.post(`${API_URL}/roles`, role);
export const updateRole = (role) => axios.put(`${API_URL}/roles/${role.id}`, role);
export const deleteRole = (id) => axios.delete(`${API_URL}/roles/${id}`);

export const updatePassword = (userDetails, newPassword) => {
    const updatedUser = {
      ...userDetails, // Preserve all user details
      password: newPassword, // Only update the password
    };
    
    return axios.put(`${API_URL}/users/${userDetails.id}`, updatedUser); // Send the updated user object
  };
