import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { stepFramesAtom, videoInfoAtom, frameRateAtom, currentFrameAtom, numOfFramesToSkipAtom, videoStateAtom, videoFilenameAtom, danceStepsAtom } from '../Recoil/atoms';

import './/CustomControls.css';
import DanceStepsManager from './DanceStepsManager';

const CustomVideoPlayer = () => {
    // Recoil states :
    const [stepFrames, setStepFrames] = useRecoilState(stepFramesAtom);
    const [videoInfo, setVideoInfo] = useRecoilState(videoInfoAtom);
    const [frameRate, setFrameRate] = useRecoilState(frameRateAtom);
    const [currentFrame, setCurrentFrame] = useRecoilState(currentFrameAtom);
    const [numOfFramesToSkip, setNumOfFramesToSkip] = useRecoilState(numOfFramesToSkipAtom);
    const [videoState, setVideoState] = useRecoilState(videoStateAtom);
    const [videoFilename, setVideoFilename] = useRecoilState(videoFilenameAtom);
    const [danceSteps, setDanceSteps] = useRecoilState(danceStepsAtom);

    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    console.log("videoInfo:", videoInfo);
    console.log("DanceSteps are :", danceSteps);
    const [showSteps, setShowSteps] = useState(false);

    const toggleSteps = () => {
        setShowSteps(!showSteps); // Toggle visibility of steps
    };

    const togglePlay = () => {
        setPlaying(!playing);
    };


    const [currentStep, setCurrentStep] = useState(null);

    const playStep = (step) => {
        setCurrentStep(step);
        const startSeconds = step.keyFrameIn / frameRate;  // assuming frameRate is available globally or passed as prop
        const endSeconds = step.keyFrameOut / frameRate;
        
        playerRef.current.seekTo(startSeconds, 'seconds');
        setPlaying(true);

        console.log("Start and end seconds are", startSeconds, endSeconds);
    
        const checkInterval = setInterval(() => {
          if (playerRef.current.getCurrentTime() >= endSeconds) {
            setPlaying(false);
            clearInterval(checkInterval);
          }
        }, 100);
      };

    return (
        <div className="player-wrapper">
            <ReactPlayer
                ref={playerRef}
                url={videoInfo.videoUrl}
                playing={playing}
                controls={true}
                width="100%"
                height="100%"
            />
            <div className="controls">
                <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
                
                {/* Additional control buttons */}
            </div>
            <div className="right-controls">
            <button className="steps-button" onClick={toggleSteps}>STEPS</button>
            <div className="steps-container">
                {danceSteps.map((step, index) => (
                    <button key={index} className="button-step" onClick={() => playStep(step)}>
                    Step {index + 1}
                    </button>
                ))}
        </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
