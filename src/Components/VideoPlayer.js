// components/VideoPlayer.js

import React, { useState, useRef, useEffect, createContext } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { setVideoInfo, setNumOfFramesToSkip, setCurrentFrame, setStepFrames, setVideoState, setVideoFilename } from '../redux/actions';
import { Slider, Button, Typography, Grid, Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { VideoPlayerContext } from './VideoPlayerContext';
import { usePlayer } from './PlayerContext';
import axios from 'axios';


const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Blue
    },
    secondary: {
      main: '#f5f5f5', // Light gray
    },
  },
});

const VideoPlayer = ({
  videoInfo,
  frameRate,
  currentFrame,
  numOfFramesToSkip,
  setCurrentFrame,
  setNumOfFramesToSkip,
  setStepFrames,
  stepFrames,
  setVideoState,
  videoState,
  setVideoInfo,
  setVideoFilename,
  videoFilename,
}) => {
  // const playerRef = useRef(null);
  const { playerRef } = usePlayer();
  const playerContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

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
    console.log("value of current frame is", currentFrame, frameNumber);
     // Dispatch action to update current frame in the Redux store
  };

  const handleSeek = (e) => {
    setCurrentFrame(Math.floor(e.playedSeconds * frameRate));
    console.log("value of current frame is", currentFrame);
  };

  const handleNumberOfFrames = (e) => {
    const newNum = parseInt(e.target.value, 10);
    setNumOfFramesToSkip(newNum);
  };

  const handleNextFrame = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + numOfFramesToSkip / frameRate, 'seconds');
    setCurrentFrame((prevFrame) => prevFrame + numOfFramesToSkip);
  };

  const handlePrevFrame = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - numOfFramesToSkip / frameRate, 'seconds');
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const player = playerRef.current;

    const drawTimeline = () => {
      const duration = player.getDuration();
      // console.log('Drawing timeline...', duration);
      canvas.width = duration * frameRate * 1;
      canvas.height = 30;

      for (let time = 0; time <= duration; time += 1 / frameRate) {
        const framePosition = time * frameRate;
        context.fillStyle = 'red';
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
      } else if (playerContainerRef.current.mozRequestFullScreen) { /* Firefox */
        playerContainerRef.current.mozRequestFullScreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) { 
        console.log("Here");/* IE/Edge */
        playerContainerRef.current.msRequestFullscreen();
      }
      playerContainerRef.current.style.width = '100%';
      playerContainerRef.current.style.height = '100%';
    }
  };

  // Function to play a particular step from frame A to frame B
  const playStepFrames = (stepFrames) => {
    if (stepFrames && Object.keys(stepFrames).length !== 0) {

    const startSeconds = stepFrames.startFrame / frameRate;
    const endSeconds = stepFrames.endFrame / frameRate;

    console.log("Start and end frames are", stepFrames.startFrame, stepFrames.endFrame, startSeconds, endSeconds);

    playerRef.current.seekTo(startSeconds, 'seconds');
    setPlaying(true);
    // handleFullScreen();

    const interval = setInterval(() => {
      // console.log("current time is:", playerRef.current.getCurrentTime());
      if (playerRef.current.getCurrentTime() >= endSeconds) {
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
    console.log("current frame in this component is :", currentFrame);

    if (playerRef.current && videoState.frame === 1) {
      console.log("Playing the video");
      playerRef.current.getInternalPlayer().play(); // Pause the video
    }
    else if (playerRef.current && videoState.frame === 2) {
      console.log("Pausing the video");
      playerRef.current.getInternalPlayer().pause(); // Pause the video
    }
  }, [videoState]);

  const url = "https://www.youtube.com/watch?v=24sm4XYi4MY";

  return (
    <VideoPlayerContext.Provider value={{ getCurrentTime }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '450px', position:'relative' }}>
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div ref={playerContainerRef} style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <ReactPlayer
            ref={playerRef}
            url={videoInfo.videoUrl}
            playing={playing}
            controls
            playbackRate={playbackRate}
            width="100%"
            height="400px"
            onProgress={handleProgress}
            config={{
              file: {
                forceVideo: true,
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        </div>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handlePrevFrame}>
              Previous Frame
            </Button>
            <Button variant="contained" onClick={handleNextFrame}>
              Next Frame
            </Button>
          </Box>
          
          
          <Typography>Current Frame: {currentFrame}</Typography>
          <canvas ref={canvasRef} sx={{ width: '100%', height: '30px', mt: '20px' }}></canvas>
        </Box>
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

const mapStateToProps = (state) => ({
  videoInfo: state.videoInfo,
  frameRate: state.frameRate,
  numOfFramesToSkip: state.numOfFramesToSkip,
  currentFrame: state.currentFrame,
  stepFrames: state.stepFrames,
  videoState: state.videoState,
  videoFilename: state.videoFilename,
});

const mapDispatchToProps = {
  setNumOfFramesToSkip,
  setCurrentFrame,
  setStepFrames,
  setVideoState,
  setVideoInfo,
  setVideoFilename,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
