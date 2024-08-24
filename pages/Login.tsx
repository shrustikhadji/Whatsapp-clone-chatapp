import React, { useState } from 'react';
import './Login.css'; // Import a CSS file for styles

interface LoginProps {
  onLogin: (user: any) => void;
  onNavigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState(''); // Changed to username
  const [password, setPassword] = useState(''); // Added state for password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { username, password }; // Include username and password
    onLogin(user);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter your username" // Updated placeholder
          value={username} // Updated value
          onChange={(e) => setUsername(e.target.value)} // Updated onChange
          required
          className="login-input"
        />
        <input
          type="password" // Input for password
          placeholder="Enter your password" // Updated placeholder
          value={password} // Updated value
          onChange={(e) => setPassword(e.target.value)} // Updated onChange
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button> {/* Updated button text */}
      </form>
      <button onClick={onNavigateToRegister} className="register-button">Create an Account</button>
    </div>
  );
};

export default Login;