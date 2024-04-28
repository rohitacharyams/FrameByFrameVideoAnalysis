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
import Navbar from './Components/Navbar';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import './/App.css';

const firebaseApp = initializeApp(firebaseConfig);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const playerRef = useRef(null);

  return (
    <Router>
      <Navbar className='navbar'/>
      
      <PlayerContext.Provider value={{ playerRef }}>
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
              <div style={{ flex: 4, position: 'relative' }}>
                <VideoPlayer/>
              </div>
              <div style={{ flex: 2, overflowY: 'auto' }}>
                <Keyframes />
              </div>
            </div>
          } />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </PlayerContext.Provider>
      <FileInput />
    </Router>
  );
};

export default App;
