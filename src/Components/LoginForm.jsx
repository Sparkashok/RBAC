import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHRLogin, setIsHRLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // HR Login credentials (static for testing)
    if (isHRLogin) {
      if (email === 'hr@gmail.com' && password === 'password123') {
        onLogin('admin');  // Set role as 'admin' for HR
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('userDetails', JSON.stringify({ email, role: 'admin' }));  // Store HR user details
        navigate('/dashboard');
      } else {
        setError('Invalid HR email or password. Please try again.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/users'); // API call to fetch all users
        const users = await response.json();

        // Find user by email
        const user = users.find((u) => u.email === email);
        if (user) { // If user exists
          // Simulate password check (assuming passwords are stored as plain text, which is not recommended)
          if (password === user.password) { // Assuming `user.password` is stored in plain text (for testing)
            onLogin('user'); // Set role as 'user' for normal user
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('role', 'user');
            localStorage.setItem('userDetails', JSON.stringify(user)); // Store user details
            navigate('/user-dashboard');
          } else {
            setError('Invalid user password. Please try again.');
          }
        } else {
          setError('Invalid user email. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to authenticate. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0f7fa]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#b3e5fc] p-10 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-[#004d40] mb-6 text-center">
          {isHRLogin ? 'HR Login' : 'User Login'}
        </h2>

        {error && <div className="mb-4 text-red-600 text-lg text-center">{error}</div>}

        <div className="mb-6">
          <label className="block text-[#004d40] mb-2 text-lg" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-[#e0f2f1] text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#80cbc4] text-lg"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-8">
          <label className="block text-[#004d40] mb-2 text-lg" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#e0f2f1] text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#80cbc4] text-lg"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#80cbc4] hover:bg-[#4db6ac] text-[#004d40] font-bold py-3 px-4 rounded-lg text-lg transition duration-200 transform hover:scale-105"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-[#004d40]">
            {isHRLogin ? 'Not HR?' : 'HR Login?'}{' '}
            <button
              type="button"
              className="text-[#0288d1] font-semibold hover:underline"
              onClick={() => {
                setIsHRLogin(!isHRLogin);
                setError(''); // Clear error on switch
              }}
            >
              {isHRLogin ? 'Switch to User Login' : 'Switch to HR Login'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
