import React, { useState } from 'react';
import './index.css';

type RegisterProps = {
  onRegister: (data: { username: string; password: string }) => void;
  onNavigateToLogin: () => void;
};

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add your registration logic here
    onRegister({ username, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Register</button>
        </form>
        <p>
          Already have an account? <button className="link-button" onClick={onNavigateToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;