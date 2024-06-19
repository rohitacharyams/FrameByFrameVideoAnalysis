// components/VideoPlayer.js

import React, { useState, useRef, useEffect, createContext } from "react";
import ReactPlayer from "react-player";
import {
  Slider,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { VideoPlayerContext } from "./VideoPlayerContext";
import { usePlayer } from "./PlayerContext";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  videoInfoAtom,
  frameRateAtom,
  currentFrameAtom,
  numOfFramesToSkipAtom,
  stepFramesAtom,
  videoStateAtom,
  videoFilenameAtom,
} from "../Recoil/atoms";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Blue
    },
    secondary: {
      main: "#f5f5f5", // Light gray
    },
  },
});

const VideoPlayer = () => {
  //Recoil states :
  const [videoInfo, setVideoInfo] = useRecoilState(videoInfoAtom);
  const [frameRate, setFrameRate] = useRecoilState(frameRateAtom);
  const [currentFrame, setCurrentFrame] = useRecoilState(currentFrameAtom);
  const [numOfFramesToSkip, setNumOfFramesToSkip] = useRecoilState(
    numOfFramesToSkipAtom
  );
  const [stepFrames, setStepFrames] = useRecoilState(stepFramesAtom);
  const [videoState, setVideoState] = useRecoilState(videoStateAtom);
  const [videoFilename, setVideoFilename] = useRecoilState(videoFilenameAtom);

  // For videos from blob store
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  // For storing video in browser cache
  const [loaded, setLoaded] = useState(false);

  // const playerRef = useRef(null);
  const { playerRef } = usePlayer();
  const playerContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  // For video timeline 
  const [frames, setFrames] = useState([]);
  const [frameCount, setFrameCount] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // for fetching video from temp store
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isPlayerVisible, setPlayerVisibility] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  const getCurrentTime = () => {
    return playerRef.current ? playerRef.current.getCurrentTime() : 0;
  };

  const [loopCount, setLoopCount] = useState(0);

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
  };

  const handleProgress = (state) => {
    // Assuming frameRate is frames per second, and state.playedSeconds gives the current playback time in seconds
    const frameNumber = Math.floor(state.playedSeconds * frameRate);
    setCurrentFrame(frameNumber);
    // Dispatch action to update current frame in the Redux store
  };

  const handleSeek = (index) => {
    const seekTo = (index / frameCount) * playerRef.current.getDuration();
    playerRef.current.seekTo(seekTo, 'seconds');
    setPlaying(true);
  };

  const handleZoomChange = (event, newValue) => {
    setZoomLevel(newValue);
  };

  const getVisibleFrames = () => {
    const step = Math.max(1, Math.floor(frameCount / (100 * zoomLevel)));
    return frames.filter((_, index) => index % step === 0);
  };

  const handleNumberOfFrames = (e) => {
    const newNum = parseInt(e.target.value, 10);
    setNumOfFramesToSkip(newNum);
  };

  const handleNextFrame = () => {
    playerRef.current.seekTo(
      playerRef.current?.getCurrentTime() + numOfFramesToSkip / frameRate,
      "seconds"
    );
    setCurrentFrame((prevFrame) => prevFrame + numOfFramesToSkip);
  };

  const handlePrevFrame = () => {
    playerRef.current.seekTo(
      playerRef.current?.getCurrentTime() - numOfFramesToSkip / frameRate,
      "seconds"
    );
    setCurrentFrame((prevFrame) => Math.max(0, prevFrame - numOfFramesToSkip));
  };

  const handleExit = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(0);
    }
    setPlayerVisibility(false);
  };

  const handlePlay = () => {
    setPlayerVisibility(true);
    play();
  };


  const fetchRandomVideo = async () => {
    console.log("Handling next video heyy");
    setLoading(true);
    try {
      const response = await fetch('http://localhost:51040/api/videosFromStorage');
      const data = await response.json();
      if (data.url) {
        await fetchVideo(data.url);
        setVideoFilename(data.videoFilename);
        fetch(`http://localhost:51040/get_frame_info`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoFilename: data.videoFilename }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to get frame info");
              }
              return response.json();
            })
            .then((data) => {
              const frameRate = parseInt(data.frameRate);
              console.log("Dude the frame rate came out to be :", frameRate);
              setFrameRate(frameRate);
            })
            .catch((error) =>
              console.error("Error getting frame rate:", error)
            );
      } else {
        console.error('Error fetching video:', data.error);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
    setLoading(false);
  };

  const fetchVideo = async (url) => {
    try {
      const response = await fetch('http://localhost:51040/api/fetch_video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.message === 'Video fetched') {
        setVideoUrl(data.videoUrl);
        console.log("the video url is : ", data.videoUrl);
      } else {
        console.error('Error fetching video:', data.error);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // useEffect(() => {
  //   fetchRandomVideo();
  // }, []);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.oncanplaythrough = () => {
        setLoaded(true);
      };
    }
  }, [currentVideo]);

  const handleNextVideo = () => {
    fetchRandomVideo();
  };

  const handlePreviousVideo = () => {
    // fetchRandomVideo();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const player = playerRef.current;

    const drawTimeline = () => {
      const duration = player.getDuration();
      // console.log('Drawing timeline...', duration);
      canvas.width = duration * frameRate * 1;
      canvas.height = 30;

      for (let time = 0; time <= duration; time += 1 / frameRate) {
        const framePosition = time * frameRate;
        context.fillStyle = "red";
        context.fillRect(framePosition, 0, 1, 30);
        // console.log('Drawing frame at', framePosition);
      }
    };

    drawTimeline();
  }, [frameRate]);

  const handleFullScreen = () => {
    console.log("Entered here");
    if (playerContainerRef.current) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (playerContainerRef.current.mozRequestFullScreen) {
        /* Firefox */
        playerContainerRef.current.mozRequestFullScreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) {
        console.log("Here"); /* IE/Edge */
        playerContainerRef.current.msRequestFullscreen();
      }
      playerContainerRef.current.style.width = "100%";
      playerContainerRef.current.style.height = "100%";
    }
  };

  // Function to play a particular step from frame A to frame B
  const playStepFrames = (stepFrames) => {
    console.log(
      "startFrame and endframes are :",
      stepFrames.startFrame,
      stepFrames.end
    );
    if (stepFrames && Object.keys(stepFrames).length !== 0) {
      const startSeconds = stepFrames.startFrame / frameRate;
      const endSeconds = stepFrames.endFrame / frameRate;

      console.log(
        "Start and end frames are",
        stepFrames.startFrame,
        stepFrames.endFrame,
        startSeconds,
        endSeconds
      );

      playerRef.current.seekTo(startSeconds, "seconds");
      setPlaying(true);
      // handleFullScreen();

      const interval = setInterval(() => {
        // console.log("current time is:", playerRef.current.getCurrentTime());
        if (playerRef.current?.getCurrentTime() >= endSeconds) {
          setPlaying(false);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  };

  // Step Wise Player
  useEffect(() => {
    playStepFrames(stepFrames);
  }, [stepFrames, playbackRate]);

  useEffect(() => {
    if (currentVideo) {
      // Clear previous video from cache when fetching a new one
      fetch('http://localhost:51040/api/clear_cache', { method: 'POST' });
    }
  }, [currentVideo]);

  useEffect(() => {
    console.log("current frame in this component is :", currentFrame);

    if (playerRef.current && videoState.frame === 1) {
      console.log("Playing the video");
      playerRef.current.getInternalPlayer().play(); // Pause the video
    } else if (playerRef.current && videoState.frame === 2) {
      console.log("Pausing the video");
      playerRef.current.getInternalPlayer().pause(); // Pause the video
    }
  }, [videoState]);

  const url = "https://www.youtube.com/watch?v=24sm4XYi4MY";

  return (
    <VideoPlayerContext.Provider value={{ getCurrentTime }}>
      <div className="flex flex-col h-450 relative">
        <ThemeProvider theme={theme}>
          <div className="flex flex-col gap-1">
            <div className="sticky top-0 z-10">
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing={playing}
                controls = {true}
                playbackRate={playbackRate}
                width="100%"
                height="400px"
                onProgress={handleProgress}
                preload="auto"
                config={{
                  file: {
                    forceVideo: true,
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                variant="contained"
                onClick={handlePrevFrame}
                className="bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/5 mr-2"
              >
                Previous Frame
              </button>
              <button
                variant="contained"
                onClick={handleNextFrame}
                className="bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/5 mr-2"
              >
                Next Frame
              </button>
            </div>
            <Box>
              <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handlePreviousVideo}>
                Previous Video
              </Button>
              <Button variant="contained" onClick={handleNextVideo}>
                Next Video
              </Button>
              </Box>
            </Box>

            <Typography className="mt-2">
              Current Frame: {currentFrame}
            </Typography>
            <canvas ref={canvasRef} className="w-full h-30 mt-2"></canvas>
          </div>
        </ThemeProvider>
      </div>
    </VideoPlayerContext.Provider>
  );

};

const VideoPlayerProvider = ({ children }) => {
  const playerRef = useRef(null);

  return (
    <VideoPlayerContext.Provider value={{ playerRef }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
