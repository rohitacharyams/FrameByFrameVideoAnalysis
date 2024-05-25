import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileInput from "./Components/FileInput";
import VideoPlayer from "./Components/VideoPlayer";
import Keyframes from "./Components/Keyframes";
import ReviewPage from "./Components/ReviewPage"; // Assuming you create this component
import { PlayerContext } from "./Components/PlayerContext";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import HomePage from "./Components/HomePages/HomePage";
import HomePageAuth from "./Components/HomePages/HomePageAuth";

const App = () => {
  const playerRef = useRef(null);

  return (
    <Router>
      <Navbar />
      <PlayerContext.Provider value={{ playerRef }}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-grow overflow-y-auto">
                <HomePage />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <HomePageAuth />
              </>
            }
          />
          <Route
            path="/labeling"
            element={
              <>
                <div className="flex flex-row h-screen">
                  <div className="flex-1 relative">
                    <VideoPlayer />
                    <div className="flex-1">
                      <FileInput />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Keyframes />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/review"
            element={
              <>
                <div>
                  <ReviewPage />
                </div>
              </>
            }
          />
        </Routes>
      </PlayerContext.Provider>
    </Router>
  );
};

export default App;
