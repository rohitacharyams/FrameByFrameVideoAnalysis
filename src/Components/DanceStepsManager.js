// DanceStepsManager.js
import React from 'react';
import { Button } from '@mui/material';
import { usePlayer } from './PlayerContext';


const DanceStepsManager = ({ danceSteps, onPlayStep }) => {
  
  const { playerRef } = usePlayer();

  return (
    <div>
      <h3>Dance Steps:</h3>
      {danceSteps.map((step, index) => (
        <div key={index}>
          <Button onClick={() => onPlayStep(step)}>{`Step ${index + 1}`}</Button>
        </div>
      ))}
    </div>
  );
};

export default DanceStepsManager;
