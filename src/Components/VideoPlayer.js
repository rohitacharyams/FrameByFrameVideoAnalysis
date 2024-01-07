// components/VideoPlayer.js

import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { setNumOfFramesToSkip, setCurrentFrame, setStepFrames } from '../redux/actions';
import { Slider, Button, Typography, Grid, Box, Container, ThemeProvider, createTheme } from '@mui/material';

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
}) => {
  const playerRef = useRef(null);
  const canvasRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [isPlayerVisible, setPlayerVisibility] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
  };

  const handleSeek = (e) => {
    setCurrentFrame(Math.floor(e.playedSeconds * frameRate));
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

  useEffect(() => {
    // Check if stepFrames is defined and not an empty object
    if (stepFrames && Object.keys(stepFrames).length !== 0) {
      // Play the specific step from startFrame to endFrame
      playerRef.current.seekTo(stepFrames.startFrame / frameRate, 'seconds');
      const duration = (stepFrames.endFrame - stepFrames.startFrame) / frameRate;
      play();
      setTimeout(() => {
        pause();
        setPlayerVisibility(false);
      }, duration * 1000);
    }
  }, [stepFrames]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ marginTop: '20px', overflow: 'hidden' }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <ReactPlayer
                ref={playerRef}
                url={videoInfo.videoUrl}
                playing={playing}
                controls
                playbackRate={playbackRate}
                width="100%"
                height="400px"
                onProgress={handleSeek}
                config={{
                  file: {
                    forceVideo: true,
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Controls
                </Typography>
                <Slider
                  value={numOfFramesToSkip}
                  onChange={handleNumberOfFrames}
                  min={1}
                  max={10}
                  step={1}
                  marks
                  sx={{ width: '100%' }}
                />
                <Typography gutterBottom>Number of Frames to Skip</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={handlePrevFrame}>
                    Previous Frame
                  </Button>
                  <Button variant="contained" onClick={handleNextFrame}>
                    Next Frame
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2, 2.5].map((speed) => (
                    <Button key={speed} variant="outlined" onClick={() => handleSpeedChange(speed)}>
                      {speed}x
                    </Button>
                  ))}
                </Box>
                <Typography>Current Frame: {currentFrame}</Typography>
                <canvas ref={canvasRef} sx={{ width: '100%', height: 30, mt: 2 }}></canvas>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  videoInfo: state.videoInfo,
  frameRate: state.frameRate,
  numOfFramesToSkip: state.numOfFramesToSkip,
  currentFrame: state.currentFrame,
  stepFrames: state.stepFrames,
});

const mapDispatchToProps = {
  setNumOfFramesToSkip,
  setCurrentFrame,
  setStepFrames,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
