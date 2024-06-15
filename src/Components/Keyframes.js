// components/Keyframes.js
import React, { useState, useContext, useEffect } from "react";
import DanceStepsManager from "./DanceStepsManager";
import "./keyFrames.css";
import { useVideoPlayer } from "./VideoPlayerContext";
import { usePlayer } from "./PlayerContext";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useAuth } from "../firebase/authContext";
import {
  currentFrameAtom,
  keyframesAtom,
  videoFilenameAtom,
  keyframeBoolAtom,
  frameRateAtom,
  stepFramesAtom,
  videoStateAtom,
  danceStepsAtom,
} from "../Recoil/atoms";

import { Button, Typography, Container, Grid, Box } from "@mui/material";

const Keyframes = () => {
  // Recoil states :
  const [currentFrame, setCurrentFrame] = useRecoilState(currentFrameAtom);
  const [keyframes, setKeyframes] = useRecoilState(keyframesAtom);
  const [videoFilename, setVideoFilename] = useRecoilState(videoFilenameAtom);
  const [keyframeBool, setKeyframeBool] = useRecoilState(keyframeBoolAtom);
  const [frameRate, setFrameRate] = useRecoilState(frameRateAtom);
  const [stepFrames, setStepFrames] = useRecoilState(stepFramesAtom);
  const [videoState, setVideoState] = useRecoilState(videoStateAtom);
  const [danceSteps, setDanceSteps] = useRecoilState(danceStepsAtom);
  const { isLoggedIn } = useAuth();

  const [KeyFrameTypeNumber, setKeyFrameTypeNumber] = useState({
    keyFrameInFrameNmber: currentFrame,
    keyFrameOutFrameNmber: currentFrame,
  });

  const [playing, setPlaying] = useState(false); // Define the playing state

  const navigate = useNavigate();

  const { playerRef } = usePlayer();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleAddKeyframeIn = () => {
    const frameNumber = Math.floor(
      playerRef?.current?.getCurrentTime() * frameRate
    );
    if (KeyFrameTypeNumber.keyFrameOutFrameNmber === currentFrame) {
      console.log(
        "please increase the frame number to start a new keyFrame as one already closed on this one"
      );
      return;
    }
    if (!keyframeBool.keyFrameOutActive) {
      console.log(
        "A keyframe is already active, first close that and then add another keyframe"
      );
      return;
    }

    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: currentFrame,
      keyFrameOutFrameNmber: KeyFrameTypeNumber.keyFrameOutFrameNmber,
    });
    setKeyframes([...keyframes, { frame: currentFrame, type: "in" }]);
    setKeyframeBool({ keyFrameInActive: true, keyFrameOutActive: false });

    console.log("Setting video state to pause, current frame", currentFrame);
    setVideoState({ currentState: true, frame: 1 });
  };

  const handleAddKeyframeOut = () => {
    const frameNumber = Math.floor(
      playerRef?.current?.getCurrentTime() * frameRate
    );
    if (KeyFrameTypeNumber.keyFrameInFrameNmber === frameNumber) {
      console.log(
        "please increase the frame number to start a new keyFrame as one already closed on this one"
      );
      return;
    }
    if (!keyframeBool.keyFrameInActive) {
      console.log(
        "Keyframe is already closed, first open one and then try closing it"
      );
      return;
    }

    console.log(
      "Key frame in and out number is : ",
      KeyFrameTypeNumber.keyFrameInFrameNmber,
      frameNumber
    );

    setKeyFrameTypeNumber({
      keyFrameInFrameNmber: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOutFrameNmber: frameNumber,
    });
    setKeyframes([...keyframes, { frame: frameNumber, type: "out" }]);
    setKeyframeBool({ keyFrameInActive: false, keyFrameOutActive: true });
    const newStep = {
      keyFrameIn: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOut: frameNumber,
      newStepId: danceSteps.length,
    };
    setDanceSteps([...danceSteps, newStep]);

    // I need something to first pause the video for a sec and then
    console.log("Setting video state to pause, current frame", frameNumber);
    setVideoState({ currentState: false, frame: 2 });
    console.log("The value of danceSteps array are :", danceSteps);
  };

  const handlePlayStep = (step) => {
    // Pass the start and end frames to the VideoPlayer component
    console.log("Passing props");
    setStepFrames({ startFrame: step.keyFrameIn, endFrame: step.keyFrameOut });
    console.log("stepFrames after dispatch:", stepFrames);
  };

  const handleLabellingDone = () => {
    console.log(videoFilename);
    fetch("http://localhost:51040/save_keyframes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyframes, video_filename: videoFilename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Keyframes saved successfully:", data);
        setDanceSteps([]); // Clear the dance steps
      })
      .catch((error) => console.error("Error saving keyframes:", error));
  };

  // useEffect(() => {
  //   console.log('Accessing playerRef in Keyframes:', playerRef.current);
  // }, [playerRef]);

  return (
    <div className="bg-white text-blue-900 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 px-5">
            {/* Dance Steps Manager */}
            <div className="text-black-800 rounded-lg shadow-lg flex justify-center p-4 h-96">
              {
                <DanceStepsManager
                  danceSteps={danceSteps}
                  onPlayStep={handlePlayStep}
                  setDanceSteps={setDanceSteps}
                />
              }
            </div>
          </div>
        </div>

        {/* Keyframe Buttons Container */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          {/* Keyframe Buttons */}
          <div className="flex justify-center space-x-6 mt-4">
            <button
              onClick={handleAddKeyframeIn}
              disabled={!keyframeBool.keyFrameOutActive}
              className="bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/2 mr-2"
            >
              Add Keyframe In
            </button>
            <button
              onClick={handleAddKeyframeOut}
              disabled={!keyframeBool.keyFrameInActive}
              className="bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/2 mr-2"
            >
              Add Keyframe Out
            </button>
          </div>

          {/* Labelling Done Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLabellingDone}
              className="bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/2 mr-2"
            >
              Labelling Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyframes;
