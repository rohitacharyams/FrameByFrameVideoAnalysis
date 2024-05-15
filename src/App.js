import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileInput from "./Components/FileInput";
import VideoPlayer from "./Components/VideoPlayer";
import Keyframes from "./Components/Keyframes";
import ReviewPage from "./Components/ReviewPage"; // Assuming you create this component
import { PlayerContext } from "./Components/PlayerContext";
import Navbar from "./Components/Navbar";
import ".//App.css";

const App = () => {
  const playerRef = useRef(null);

  return (
    <Router>
      <div className="container mx-auto">
        <Navbar />
      </div>
      <PlayerContext.Provider value={{ playerRef }}>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100vh",
                }}
              >
                <div style={{ flex: 4, position: "relative" }}>
                  <VideoPlayer />
                </div>
                <div style={{ flex: 2, overflowY: "auto" }}>
                  <Keyframes />
                </div>
              </div>
            }
          />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </PlayerContext.Provider>
      <FileInput />
    </Router>
  );
};

export default App;
