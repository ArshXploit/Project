import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import StandalonePage from './StandalonePage';

const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      const password = prompt("Please enter the admin password:");
      if (password === "Admin Panel") {
        sessionStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password!");
        window.location.href = '/';
      }
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return <AdminPanel />;
};

const App = () => {
  return (
    <Routes>
      <Route 
        path="/AdminPanel" 
        element={
          <StandalonePage>
            <ProtectedAdminRoute />
          </StandalonePage>
        } 
      />
    </Routes>
  );
};

export default App; 