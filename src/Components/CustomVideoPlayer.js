import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { setVideoInfo, setNumOfFramesToSkip, setCurrentFrame, setStepFrames, setVideoState, setVideoFilename, setDanceSteps } from '../redux/actions';
import { Button } from '@mui/material';

import './/CustomControls.css';
import DanceStepsManager from './DanceStepsManager';

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
  videoFilename,
  setDanceSteps,
  danceSteps,
   }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(null);
    const [loop, setLoop] = useState(false);

    console.log("videoInfo:", videoInfo);
    console.log("DanceSteps are :", danceSteps);
    const [showSteps, setShowSteps] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const toggleSteps = () => {
        setShowSteps(!showSteps); // Toggle visibility of steps
    };

    const togglePlay = () => {
        setPlaying(!playing);
    };


    const playStep = (step) => {
        if (!step) return;
        console.log("Heyyy therere here is the new step with values", step);
        setCurrentStep(step);
        const startSeconds = step.keyFrameIn / frameRate;  
        const endSeconds = step.keyFrameOut / frameRate;

        
        
        playerRef.current.seekTo(startSeconds, 'seconds');
        setPlaying(true);

        if (playerRef.current.loopInterval) {
            
            clearInterval(playerRef.current.loopInterval);
            playerRef.current.loopInterval = null;
        }

        if (playerRef.current.stopTimeout) {
            clearTimeout(playerRef.current.stopTimeout);
            playerRef.current.stopTimeout = null;
        }

        

        if (loop) {
            playerRef.current.loopInterval = setInterval(() => {
                
                if (playerRef.current.getCurrentTime() >= endSeconds) {
                    
                    playerRef.current.seekTo(startSeconds, 'seconds');
                }
            }, 100);
        } else {
            // Stop playing when the end of the step is reached
            
            const timeout = setTimeout(() => {
                
                if (playerRef.current.getCurrentTime() >= endSeconds) {
                    
                    setPlaying(false);
                }
            }, endSeconds-startSeconds * 1000); // Convert to milliseconds

            return () => clearTimeout(timeout);
        }

      };

      useEffect(() => {
        if (currentStep) {
            playStep(currentStep);
        }
    }, [currentStep, loop]);

    useEffect(() => {
        if (!loop && playerRef.current.loopInterval) {
            clearInterval(playerRef.current.loopInterval);
            playerRef.current.loopInterval = null;
        }
    }, [loop]);

    const toggleLoop = () => {
        setLoop(!loop);
        if (!loop) {
            playStep(currentStep); // Restart playing with loop if toggled on
        }
    };

    const handleStepChange = (step) => {
        setCurrentStep(step);
        // setLoop(false); // Stop looping when a new step is selected
    };

    useEffect(() => {
        playStep(currentStepIndex);
    }, [currentStepIndex]);

    const handleNextStep = () => {
        console.log("Current value of step is this :", currentStep.newStepId);
        var nextStep = null;
        if(currentStep.newStepId + 1 < danceSteps.length){
            nextStep = danceSteps[currentStep.newStepId + 1]
            handleStepChange(nextStep);
            setCurrentStep(nextStep);
        }
        
        //setCurrentStepIndex(prev => (prev + 1) % danceSteps.length);
    };

    const handlePreviousStep = () => {
        var prevStep = null;
        if(currentStep.newStepId - 1 >= 0)
        {
            prevStep = danceSteps[currentStep.newStepId - 1];
            handleStepChange(prevStep);
            setCurrentStep(prevStep);
        }
        
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
                onEnded={() => {
                    if (!loop) setPlaying(false);
                }}
                key={currentStep ? currentStep.KeyframeIn : 'default-key'}
            />
            <div className="controls">
                <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={() => handlePreviousStep()}>Prev</button>
                <button onClick={() => handleNextStep()}>Next</button>
                <button onClick={toggleLoop}>{loop ? 'Stop Loop' : 'Loop'}</button>
                {/* Additional control buttons */}
            </div>
            <div className="right-controls">
            <button className="steps-button" onClick={toggleSteps}>STEPS</button>
            <div className="steps-container">
            {danceSteps.map((step, index) => (
                    <button key={index} onClick={() => handleStepChange(step)}>
                        {`Step ${index + 1}`}
                    </button>
                ))}
        </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    videoInfo: state.videoInfo,
    danceSteps: state.danceSteps,
    frameRate: state.frameRate,
});

const mapDispatchToProps = {
    setVideoInfo,
    setDanceSteps,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomVideoPlayer);
