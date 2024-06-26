import React from "react";
import Navbar from "./Navbar/Navbar"; // Your Navbar component
import CustomVideoPlayer from "./CustomVideoPlayer";
import "./ReviewPage.css"; // Make sure to import the CSS

const ReviewPage = () => {
  return (
    <div >
      <div className="player-container">
        <CustomVideoPlayer /> {/* Your custom video player */}
      </div>
    </div>
  );
};

export default ReviewPage;
