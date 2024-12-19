import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, roles }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/user-profile" replace />;
  }

  // If roles are specified, check if user has required role
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/user-profile" replace />;
  }

  // Optional: Add token validation with backend
  const validateToken = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      // Token is invalid, clear storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      return false;
    }
  };


  return children;
};

export default PrivateRoute;