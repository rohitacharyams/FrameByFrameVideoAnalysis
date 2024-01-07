// components/Keyframes.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setKeyframes, setKeyframeBool, setStepFrames } from '../redux/actions';
import DanceStepsManager from './DanceStepsManager';
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
  stepFrames,
}) => {
  const [KeyFrameTypeNumber, setKeyFrameTypeNumber] = useState({
    keyFrameInFrameNmber: currentFrame,
    keyFrameOutFrameNmber: currentFrame,
  });

  const [danceSteps, setDanceSteps] = useState([]);

  const handleAddKeyframeIn = () => {
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
  };

  const handleAddKeyframeOut = () => {
    if (KeyFrameTypeNumber.keyFrameInFrameNmber === currentFrame) {
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

    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOutFrameNmber: currentFrame,
    });
    setKeyframes([...keyframes, { frame: currentFrame, type: 'out' }]);
    setKeyframeBool({ keyFrameInActive: false, keyFrameOutActive: true });
    const newStep = {
      keyFrameIn: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOut: currentFrame,
    };
    setDanceSteps([...danceSteps, newStep]);
  };

  const handlePlayStep = (step) => {
    // Pass the start and end frames to the VideoPlayer component
    console.log('Passing props');
    setStepFrames(step.keyFrameIn, step.keyFrameOut);
    console.log('stepFrames after dispatch:', stepFrames);
  };

  const handleLabellingDone = () => {
    console.log(videoFilename);
    fetch('http://localhost:5000/save_keyframes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyframes, video_filename: videoFilename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Keyframes saved successfully:', data);
      })
      .catch((error) => console.error('Error saving keyframes:', error));
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Box>
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

          <Box mt={2}>
            <Typography variant="h3">Keyframes:</Typography>
            <ul>
              {keyframes.map((keyframe, index) => (
                <li key={index}>{`Frame ${keyframe.frame} - Type: ${keyframe.type}`}</li>
              ))}
            </ul>
          </Box>

          <Box mt={2}>
            <Button variant="contained" onClick={handleLabellingDone}>
              Labelling Done
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <DanceStepsManager danceSteps={danceSteps} onPlayStep={handlePlayStep} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentFrame: state.currentFrame,
  keyframes: state.keyframes,
  keyframeBool: state.keyframeBool,
  videoFilename: state.videoFilename,
  stepFrames: state.stepFrames,
});

const mapDispatchToProps = {
  setKeyframes,
  setKeyframeBool,
  setStepFrames,
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyframes);
