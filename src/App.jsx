import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserDashboard from './Components/UserDashboard';
import Navbar from './Components/Navbar';
import UserNavbar from './Components/UserNavbar';
import Dashboard from './components/Dashboard';
import LoginForm from './Components/LoginForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Check authentication and role from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');
    setIsAuthenticated(authStatus === 'true');
    setUserRole(role);
  }, []);

  // Handle user login and save authentication data in localStorage
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
  };

  // Handle user logout and clear localStorage data
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Conditionally render the Navbar based on userRole */}
        {isAuthenticated && userRole === 'user' && <UserNavbar onLogout={handleLogout} />}
        {isAuthenticated && userRole === 'admin' && <Navbar onLogout={handleLogout} />}
        
        <div className="p-6">
          <Routes>
            {/* Redirect to dashboard based on role */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to={userRole === 'user' ? '/user-dashboard' : '/dashboard'} /> : <LoginForm onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated && userRole === 'admin' ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/user-dashboard"
              element={isAuthenticated && userRole === 'user' ? <UserDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/users"
              element={isAuthenticated && userRole === 'admin' ? <UserList /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
