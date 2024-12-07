import React, { useState, useEffect } from 'react';
import { updatePassword } from '../services/api'; // Import the API call for password update

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));

    if (!storedUser) {
      window.location.href = '/'; // Redirect to login if no user data is found
    } else {
      setUserDetails(storedUser);
      setIsLoading(false); // Set loading to false once data is loaded
    }
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call the API to update only the password in the backend, while keeping the rest of the user details
      await updatePassword(userDetails, newPassword);

      // Update localStorage with the new password after successful change
      const updatedUserDetails = { ...userDetails, password: newPassword }; // Only update password
      localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));

      alert('Password updated successfully');
      setError(''); 
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update the password. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#e0f7fa] p-6">
      <div className="bg-[#b3e5fc] p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-[#004d40] mb-6 text-center">
          Welcome, {userDetails.email}!
        </h2>

        {/* User Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src="https://imgs.search.brave.com/z6tTfo8x50B8_m1GvlCNc_Kk12YwoI9hbNiI3w76s18/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ4/MzQ4NzAzNC9waG90/by9wb3J0cmFpdC1v/Zi1hLWN1dGUtZmVt/YWxlLXZpZGVvLWdh/bWUtYXZhdGFyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1h/eGwyZ2lQQnZoakxh/ZU5iWVJ0VlM0TEox/NHFwUU1leE5SMVFQ/ZVZqaGVzPQ"
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-[#80cbc4]"
          />
        </div>

        {/* User Information */}
        <div className="mb-6">
          <p className="text-lg text-[#004d40]">
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p className="text-lg text-[#004d40]">
            <strong>Email:</strong> {userDetails.email}
          </p>
          {/* Displaying User Role */}
          <p className="text-lg text-[#004d40]">
            <strong>Role:</strong> {userDetails.role || 'No role assigned'}
          </p>
        </div>

        {/* Password Change Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#004d40]">Change Password</h3>

          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded bg-[#e0f2f1] text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#80cbc4] text-lg mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-[#e0f2f1] text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#80cbc4] text-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handlePasswordChange}
            className="mt-4 w-full bg-[#80cbc4] hover:bg-[#4db6ac] text-[#004d40] font-bold py-3 px-4 rounded-lg text-lg transition duration-200 transform hover:scale-105"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
