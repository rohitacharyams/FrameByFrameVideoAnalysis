import React, { useState, useRef } from 'react';
import FileInput from './Components/FileInput';
import VideoPlayer from './Components/VideoPlayer';
import Keyframes from './Components/Keyframes';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import AuthService from './Components/AuthService';
import { PlayerContext } from './Components/PlayerContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Assume playerRef is declared and initialized here if you plan to provide it from App.js
  const playerRef = useRef(null);

  const handleLogin = async (credentials) => {
    // Your login logic
  };

  const handleLogout = () => {
    // Your logout logic
  };

  return (
    <div>
    <PlayerContext.Provider value={{ playerRef }}>
      <FileInput />
      <div style={{ display: 'flex', flexDirection: 'row', height: '10vh' }}>
        <div style={{ flex: 4, minHeight: '100vh', position: 'relative' }}>
          <VideoPlayer/>
        </div>
        <div style={{ flex: 2, overflowY: 'auto', height: '100vh' }}>
          <Keyframes />
        </div>
      </div>
    </PlayerContext.Provider>
    </div>
  );
};

export default App;
