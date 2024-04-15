import React, { createContext, useContext, useRef } from 'react';

export const VideoPlayerContext = createContext({
  getCurrentTime: () => 0,
  // Add other control functions as needed
});

export const useVideoPlayer = () => useContext(VideoPlayerContext);
