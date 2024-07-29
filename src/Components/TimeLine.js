// components/Timeline.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFrame } from '../redux/actions';
import VideoThumbnail from "react-video-thumbnail";

const ThumbnailWidth = 50; // Adjust the thumbnail width as needed

const Timeline = () => {
  const dispatch = useDispatch();
  const currentFrame = useSelector((state) => state.currentFrame);

  const handleFrameClick = (frame) => {
    // dispatch(setFrame(frame));
    // Add logic to navigate to the selected frame in your video
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {[...Array(100).keys()].map((frame) => (
        <div
          key={frame}
          style={{
            width: ThumbnailWidth,
            height: "60px", // Adjust the height as needed
            marginRight: "2px",
            cursor: "pointer",
          }}
          onClick={() => handleFrameClick(frame)}
        >
          <VideoThumbnail
            videoUrl="https://danceai.us-cdp2.choreoapps.dev/upload/boy_-_21827 (Original).mp4"
            width={ThumbnailWidth}
            height={60} // Adjust the height as needed
            frameCount={100} // Total number of frames in your video
            frame={frame}
            onSeek={() => handleFrameClick(frame)}
          />
        </div>
      ))}
    </div>
  );
};

export default Timeline;
