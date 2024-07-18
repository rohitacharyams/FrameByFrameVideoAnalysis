// DanceStepsManager.js
import React from "react";
import { Button } from "@mui/material";
import { usePlayer } from "./PlayerContext";

const DanceStepsManager = ({ danceSteps, onPlayStep, setDanceSteps, KeyFrameTypeNumber, setKeyFrameTypeNumber }) => {
  const { playerRef } = usePlayer();

  const handleDeleteLastStep = () => {
    setDanceSteps((prevSteps) => prevSteps.slice(0, -1));
    // setKeyFrameTypeNumber((prevSteps) => prevSteps.slice(0, -1));
    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: -1,
      keyFrameOutFrameNmber: -1,
    });
    console.log("This was called", danceSteps, KeyFrameTypeNumber);
  };

  return (
    <div>
      <h3>Dance Steps:</h3>
      {danceSteps.map((step, index) => (
        <div className="flex" key={index} style={{ marginLeft: '80px' }}>
          <Button onClick={() => onPlayStep(step)}>{`Step ${
            index + 1
          }`}</Button>
          {index === danceSteps.length - 1 && (
            <button
              onClick={handleDeleteLastStep}
              className="bg-red-600 text-white hover:bg-red-500 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/2"
            >
              Delete Step
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DanceStepsManager;
