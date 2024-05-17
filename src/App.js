import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileInput from "./Components/FileInput";
import VideoPlayer from "./Components/VideoPlayer";
import Keyframes from "./Components/Keyframes";
import ReviewPage from "./Components/ReviewPage"; // Assuming you create this component
import { PlayerContext } from "./Components/PlayerContext";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import HomePage from "./Components/HomePage";

const App = () => {
  const playerRef = useRef(null);

  return (
    <Router>
      <PlayerContext.Provider value={{ playerRef }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />
          <Route
            path="/VideoPlayer"
            element={
              <>
                <Navbar />
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
                  <FileInput />
                </div>
              </>
            }
          />
          <Route
            path="/review"
            element={
              <>
                <Navbar />
                <div className="container mx-auto">
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
