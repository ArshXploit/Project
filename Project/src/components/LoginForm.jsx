import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isNewUser) {
        // Handle password setup
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        
        await axios.post('/api/auth/setup-password', {
          username,
          password
        });
        
        // Redirect to dashboard or home
      } else {
        // Try to login
        const response = await axios.post('/api/auth/login', {
          username,
          password
        });
        
        // If backend indicates this is a new user
        if (response.data.isNewUser) {
          setIsNewUser(true);
          return;
        }
        
        // Handle successful login
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      
      {isNewUser && (
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      )}
      
      <button type="submit">
        {isNewUser ? 'Setup Password' : 'Login'}
      </button>
    </form>
  );
} 