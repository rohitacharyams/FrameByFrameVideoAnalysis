import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { setVideoInfo, setNumOfFramesToSkip, setCurrentFrame, setStepFrames, setVideoState, setVideoFilename } from '../redux/actions';
import { Slider, Button, Typography, Grid, Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { VideoPlayerContext } from './VideoPlayerContext';
import { usePlayer } from './PlayerContext';
import axios from 'axios';
import './/CustomControls.css';

const CustomVideoPlayer = ({ 
  stepFrames,
  videoInfo,
  frameRate,
  currentFrame,
  numOfFramesToSkip,
  setCurrentFrame,
  setNumOfFramesToSkip,
  setStepFrames,
  setVideoState,
  videoState,
  setVideoInfo,
  setVideoFilename,
  videoFilename, }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    console.log("videoInfo:", videoInfo);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // useEffect(() => {
    //     if (stepFrames) {
    //         playStepFrames(stepFrames);
    //     }
    // }, [stepFrames]);

    // const playStepFrames = ({ startFrame, endFrame }) => {
    //     const startSeconds = startFrame / 30;  // assuming 30 FPS for calculations
    //     const endSeconds = endFrame / 30;

    //     playerRef.current.seekTo(startSeconds, 'seconds');
    //     setPlaying(true);

    //     const interval = setInterval(() => {
    //         if (playerRef.current.getCurrentTime() >= endSeconds) {
    //             setPlaying(false);
    //             clearInterval(interval);
    //         }
    //     }, 100);

    //     return () => clearInterval(interval);
    // };

    const togglePlay = () => {
        setPlaying(!playing);
    };

    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        // This function should toggle full screen in a way that keeps the steps pane accessible.
        // This could involve custom fullscreen handling rather than using default browser fullscreen.
    };

    return (
        <div className="player-wrapper" >
        <ReactPlayer
            ref={playerRef}
            url={videoInfo.videoUrl}
            playing={playing}
            controls={false}
            width="100%"
            height="100%"
            onProgress={({ playedSeconds }) => console.log('Current Time:', playedSeconds)}
            className="react-player"
        />
            
            <div className="controls">
                <button onClick={togglePlay}>{playing ? '⏸' : '▶️'}</button>
                <button >🔁</button>
                <button >🔄</button>
                <button >🖥️</button>
                <button >🔧</button>
            </div>
            
            
        </div>
    );
};
const mapStateToProps = (state) => ({
    videoInfo: state.videoInfo
});

const mapDispatchToProps = {
    setVideoInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomVideoPlayer);
