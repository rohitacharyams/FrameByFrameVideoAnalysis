// src/components/VideoBackground.js
import React from "react";
import ReactPlayer from "react-player";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <ReactPlayer
        url="https://www.youtube.com/embed/E7wJTI-1dvQ" // Replace with your video URL
        playing
        loop
        muted
        volume={0}
        width="100%"
        height="100vh"
        style={{ position: "absolute", top: 0, left: 0 }}
        controls={false} // Disables native controls
        playsinline // Prevents fullscreen playback on mobile
        config={{
          file: {
            attributes: {
              disablePictureInPicture: true, // Disables PIP
              controlsList: "nodownload nofullscreen noremoteplayback", // Disables download, fullscreen, and remote playback
            },
          },
        }}
      />
    </div>
  );
};

export default VideoBackground;
