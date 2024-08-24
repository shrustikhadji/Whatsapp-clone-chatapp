import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <div className="app-container">
      {user ? (
        <Chat user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;