import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileInput from './Components/FileInput';
import VideoPlayer from './Components/VideoPlayer';
import Keyframes from './Components/Keyframes';
import ReviewPage from './Components/ReviewPage';  // Assuming you create this component
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import AuthService from './Components/AuthService';
import { PlayerContext } from './Components/PlayerContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const playerRef = useRef(null);

  return (
    <Router>
      <PlayerContext.Provider value={{ playerRef }}>
        
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'flex', flexDirection: 'row', height: '10vh' }}>
              <div style={{ flex: 4, minHeight: '100vh', position: 'relative' }}>
                <VideoPlayer/>
              </div>
              <div style={{ flex: 2, overflowY: 'auto', height: '100vh' }}>
                <Keyframes />
              </div>
            </div>
          } />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </PlayerContext.Provider>
    </Router>
  );
};

export default App;
