import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This matches the predefined logic we discussed
    if (creds.user === 'admin' && creds.pass === 'password123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={e => setCreds({...creds, user: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setCreds({...creds, pass: e.target.value})} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}