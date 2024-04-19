// components/Keyframes.js
import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { setKeyframes, setKeyframeBool, setStepFrames, setVideoState, UPDATE_DISPLAYED_STEP } from '../redux/actions';
import DanceStepsManager from './DanceStepsManager';
import './keyFrames.css';
import { useVideoPlayer } from './VideoPlayerContext';
import { usePlayer } from './PlayerContext';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material';



const Keyframes = ({
  currentFrame,
  keyframes,
  videoFilename,
  keyframeBool,
  setKeyframes,
  setKeyframeBool,
  setStepFrames,
  frameRate,
  increaseFrameCount,
  stepFrames,
  setVideoState,
  videoState,
}) => {
  const [KeyFrameTypeNumber, setKeyFrameTypeNumber] = useState({
    keyFrameInFrameNmber: currentFrame,
    keyFrameOutFrameNmber: currentFrame,
  });

  const [playing, setPlaying] = useState(false); // Define the playing state

  const [danceSteps, setDanceSteps] = useState([]);

  const navigate = useNavigate();
  
  const { playerRef } = usePlayer();
  const [currentFrameNumber, setCurrentFrameNumber] = useState(0);


  const handleAddKeyframeIn = () => {
    const frameNumber = Math.floor(playerRef.current.getCurrentTime() * frameRate);
    if (KeyFrameTypeNumber.keyFrameOutFrameNmber === currentFrame) {
      console.log(
        'please increase the frame number to start a new keyFrame as one already closed on this one'
      );
      return;
    }
    if (!keyframeBool.keyFrameOutActive) {
      console.log(
        'A keyframe is already active, first close that and then add another keyframe'
      );
      return;
    }

    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: currentFrame,
      keyFrameOutFrameNmber: KeyFrameTypeNumber.keyFrameOutFrameNmber,
    });
    setKeyframes([...keyframes, { frame: currentFrame, type: 'in' }]);
    setKeyframeBool({ keyFrameInActive: true, keyFrameOutActive: false });

    console.log("Setting video state to pause, current frame", currentFrame);
    setVideoState(true, 1)
  };

  const handleAddKeyframeOut = () => {
    const frameNumber = Math.floor(playerRef.current.getCurrentTime() * frameRate);
    if (KeyFrameTypeNumber.keyFrameInFrameNmber === frameNumber) {
      console.log(
        'please increase the frame number to start a new keyFrame as one already closed on this one'
      );
      return;
    }
    if (!keyframeBool.keyFrameInActive) {
      console.log(
        'Keyframe is already closed, first open one and then try closing it'
      );
      return;
    }

    console.log("Key frame in and out number is : ", KeyFrameTypeNumber.keyFrameInFrameNmber, frameNumber);

    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOutFrameNmber: frameNumber,
    });
    setKeyframes([...keyframes, { frame: frameNumber, type: 'out' }]);
    setKeyframeBool({ keyFrameInActive: false, keyFrameOutActive: true });
    const newStep = {
      keyFrameIn: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOut: frameNumber,
    };
    setDanceSteps([...danceSteps, newStep]);

    // I need something to first pause the video for a sec and then 
    console.log("Setting video state to pause, current frame", frameNumber);
    setVideoState(false, 2, (dispatch) => {
      dispatch({type: UPDATE_DISPLAYED_STEP, payload: frameNumber});
    });

  };

  const handlePlayStep = (step) => {
    // Pass the start and end frames to the VideoPlayer component
    console.log('Passing props');
    setStepFrames(step.keyFrameIn, step.keyFrameOut);
    console.log('stepFrames after dispatch:', stepFrames);
  };

  const handleLabellingDone = () => {
    console.log(videoFilename);
    fetch('http://localhost:61987/save_keyframes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyframes, video_filename: videoFilename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Keyframes saved successfully:', data);
        navigate('/review');
      })
      .catch((error) => console.error('Error saving keyframes:', error));
  };

  // useEffect(() => {
  //   console.log('Accessing playerRef in Keyframes:', playerRef.current);
  // }, [playerRef]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Video Player */}
          <Box>
            {/* Video Player Component */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Dance Steps Manager */}
          <Box>
            <DanceStepsManager danceSteps={danceSteps} onPlayStep={handlePlayStep} />
          </Box>
        </Grid>
      </Grid>
      <div className="keyframe-buttons-container" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
      <Box mt={2}>
        {/* Keyframe Buttons */}
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleAddKeyframeIn}
            disabled={!keyframeBool.keyFrameOutActive}
          >
            Add Keyframe In
          </Button>
          <Button
            variant="contained"
            onClick={handleAddKeyframeOut}
            disabled={!keyframeBool.keyFrameInActive}
          >
            Add Keyframe Out
          </Button>
        </Box>
        
      </Box>

      


      <Box mt={2}>
        {/* Labelling Done Button */}
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleLabellingDone}>
            Labelling Done
          </Button>
        </Box>
      </Box>

      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentFrame: state.currentFrame,
  keyframes: state.keyframes,
  keyframeBool: state.keyframeBool,
  videoFilename: state.videoFilename,
  stepFrames: state.stepFrames,
  videoState: state.videoState,
  frameRate: state.frameRate,
});

const mapDispatchToProps = {
  setKeyframes,
  setKeyframeBool,
  setStepFrames,
  setVideoState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyframes);
