import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import p23 from '../assets/p23.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleFirstLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      console.log('Setting up password for:', loginData.username);
      
      const response = await axios.post(
        'http://localhost:5000/api/auth/setup-password',
        {
          username: loginData.username.trim(),
          password: loginData.password.trim()
        }
      );

      console.log('Password setup response:', response.data);

      if (response.data.token) {
        // Store auth data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('tokenExpires', new Date().getTime() + (2 * 60 * 60 * 1000));

        // Show success message
        alert('Password setup successful! Redirecting to dashboard...');

        // Redirect to appropriate dashboard
        window.location.href = response.data.role === 'teacher' 
          ? '/teacher-dashboard' 
          : '/student-dashboard';
      }
    } catch (error) {
      console.error('Password setup error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to set up password. Please try again.');
      setLoginData(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      console.log('Attempting login with:', loginData.username);
      
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username: loginData.username.trim(),
          password: loginData.password.trim()
        }
      );

      console.log('Login response:', response.data);

      // Handle first-time login
      if (response.data.isNewUser) {
        console.log('First time login detected, switching to password setup');
        setIsFirstTimeLogin(true);
        return;
      }

      // Handle successful login
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('tokenExpires', new Date().getTime() + (2 * 60 * 60 * 1000));

        // Redirect to appropriate dashboard
        window.location.href = response.data.role === 'teacher' 
          ? '/teacher-dashboard' 
          : '/student-dashboard';
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Login failed');
      setLoginData(prev => ({ ...prev, password: '' }));
    }
  };

  const navigateToDashboard = (role) => {
    switch(role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      default:
        navigate('/user-profile');
    }
  };

  // Add a logout function
  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Force reload to clear any cached state
    window.location.href = '/user-profile';
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/a56.gif')",
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={p23} width="120" alt="Logo" />
            <h1 className="mb-2 text-2xl font-semibold">
              {isFirstTimeLogin ? 'Set Up Your Password' : 'Student/Teacher Portal'}
            </h1>
            {isFirstTimeLogin && (
              <p className="text-sm text-center text-gray-300">
                This is your first login. Please set up your password.
              </p>
            )}
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-center text-sm">
              {error}
            </div>
          )}

          {isFirstTimeLogin ? (
            <form onSubmit={handleFirstLoginSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-orange-600 bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-full"
                  type="text"
                  value={loginData.username}
                  disabled
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-neon bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-full"
                  type="password"
                  placeholder="Set New Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-neon bg-opacity-100 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Set Password
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-orange-600 bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    username: e.target.value
                  })}
                  required
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-neon bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    password: e.target.value
                  })}
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-red-500 text-center text-sm">
                  {error}
                </div>
              )}
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-neon bg-opacity-100 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;