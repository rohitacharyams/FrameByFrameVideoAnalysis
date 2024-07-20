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
  KeyFrameTypeNumberAtom,
} from "../Recoil/atoms";

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
  const [KeyFrameTypeNumber, setKeyFrameTypeNumber] = useRecoilState(
    KeyFrameTypeNumberAtom
  );
  const { isLoggedIn } = useAuth();

  const [probableEndFrames, setProbableEndFrames] = useState({});

  const [playing, setPlaying] = useState(false); // Define the playing state

  const navigate = useNavigate();

  const { playerRef } = usePlayer();

  const [selectedComponents, setSelectedComponents] = useState([]);
  const [showComponentPopup, setShowComponentPopup] = useState(false);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleAddKeyframeIn = () => {
    const frameNumber = Math.floor(
      playerRef?.current?.getCurrentTime() * frameRate
    );
    if (KeyFrameTypeNumber.keyFrameOutFrameNmber > currentFrame) {
      console.log("The frames are :", KeyFrameTypeNumber, currentFrame);
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
    // setVideoState({ currentState: true, frame: 1 });

    fetchProbableEndFrames(currentFrame);
  };

  const fetchProbableEndFrames = async (startFrame) => {
    const response = await fetch(
      "http://localhost:51040/api/get_probable_end_frames",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoFilename: videoFilename,
          startFrame: startFrame,
          frameRate: frameRate,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("The end frames prediction are : ", data);
      setProbableEndFrames(data.probableEndFrames);
      const uniqueFrames = new Set();
      Object.values(data.probableEndFrames).forEach((frames) => {
        frames.forEach((frame) => uniqueFrames.add(frame));
      });
      const sortedUniqueFrames = [...uniqueFrames].sort((a, b) => a - b);
      setProbableEndFrames(sortedUniqueFrames);
    } else {
      console.error("Failed to fetch probable end frames", data);
    }
  };

  const handleSelectProbableEndFrame = (frame) => {
    // console.log("The starting of the step is : ", KeyFrameTypeNumber.keyFrameInFrameNmber / frameRate);
    const startFrameNumber = KeyFrameTypeNumber.keyFrameInFrameNmber;
    const endFrameNumber = frame;

    console.log(
      "The starting and ending frames are : ",
      startFrameNumber,
      endFrameNumber
    );
    setStepFrames({
      startFrame: KeyFrameTypeNumber.keyFrameInFrameNmber,
      endFrame: frame,
    });
  };

  const handleAddKeyframeOut = () => {
    const frameNumber = Math.floor(
      playerRef?.current?.getCurrentTime() * frameRate
    );
    console.log("The frames are in out are:", KeyFrameTypeNumber, currentFrame);
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
    setShowComponentPopup(true); // Show pop-up for component selection
    setKeyframeBool({ keyFrameInActive: false, keyFrameOutActive: true });
    setProbableEndFrames([]); // Clear the probable end frames
    // const newStep = {
    //   keyFrameIn: KeyFrameTypeNumber.keyFrameInFrameNmber,
    //   keyFrameOut: frameNumber,
    //   newStepId: danceSteps.length,
    //   components: selectedComponents,
    // };
    // setDanceSteps([...danceSteps, newStep]);
    // setShowComponentButtons(true);

    // I need something to first pause the video for a sec and then
    console.log("Setting video state to pause, current frame", frameNumber);
    setVideoState({ currentState: false, frame: 2 });
    console.log("The value of danceSteps array are :", danceSteps);
  };

  const handleComponentSelection = (component) => {
    setSelectedComponents((prev) => {
      if (prev.includes(component)) {
        return prev.filter((c) => c !== component);
      } else {
        return [...prev, component];
      }
    });
  };
  
  const saveComponentSelection = () => {
    const newStep = {
      keyFrameIn: KeyFrameTypeNumber.keyFrameInFrameNmber,
      keyFrameOut: KeyFrameTypeNumber.keyFrameOutFrameNmber,
      newStepId: danceSteps.length,
      components: selectedComponents,
    };
    setDanceSteps([...danceSteps, newStep]);
    setShowComponentPopup(false);
    setSelectedComponents([]);
    setProbableEndFrames([]); // Clear the probable end frames
  };

  const handlePlayStep = (step) => {
    // Pass the start and end frames to the VideoPlayer component
    console.log("Passing props");
    setStepFrames({ startFrame: step.keyFrameIn, endFrame: step.keyFrameOut });
    console.log("stepFrames after dispatch:", stepFrames);
  };

  const handleLabellingDone = () => {
    console.log(
      "The name of  video file is :",
      videoFilename,
      "And the dance steps are :",
      danceSteps
    );
    fetch("http://localhost:51040/save_keyframes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ danceSteps, video_filename: videoFilename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Keyframes saved successfully:", data);
        setDanceSteps([]); // Clear the dance steps
        setKeyframes([]);
        setKeyFrameTypeNumber({
          keyFrameInFrameNmber: -1,
          keyFrameOutFrameNmber: -1,
        });
      })
      .catch((error) => console.error("Error saving keyframes:", error));
  };

  // useEffect(() => {
  //   console.log('Accessing playerRef in Keyframes:', playerRef.current);
  // }, [playerRef]);

  return (
    <div className="bg-white text-blue-900 min-h-screen">
      <div className="container mx-auto py-8">
        {/* Probable End Frames Buttons */}
        {probableEndFrames.length > 0 && (
          <div className="flex flex-col items-center space-y-4 mt-4">
            {probableEndFrames.map((frame) => (
              <button
                key={frame}
                onClick={() => handleSelectProbableEndFrame(frame)}
                className="bg-green-500 text-white hover:bg-green-400 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
                Frame {frame}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 px-5">
            {/* Dance Steps Manager */}
            <div className="text-black-800 rounded-lg shadow-lg flex justify-center p-4 h-96">
              {
                <DanceStepsManager
                  danceSteps={danceSteps}
                  onPlayStep={handlePlayStep}
                  setDanceSteps={setDanceSteps}
                  KeyFrameTypeNumber={KeyFrameTypeNumber}
                  setKeyFrameTypeNumber={setKeyFrameTypeNumber}
                />
              }
            </div>
          </div>
        </div>

        {/* Component Selection Pop-Up */}
        {showComponentPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl mb-4">Select Influencing Components</h2>
              <div className="flex flex-col items-center space-y-4">
                {["vocals", "drums", "bass", "other", "guitar", "piano"].map((component) => (
                  <button
                    key={component}
                    onClick={() => handleComponentSelection(component)}
                    className={`${
                      selectedComponents.includes(component) ? "bg-blue-500" : "bg-gray-500"
                    } text-white hover:bg-gray-400 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50`}
                  >
                    {component}
                  </button>
                ))}
              </div>
              <button
                onClick={saveComponentSelection}
                className="mt-4 bg-indigo-800 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Save Selection
              </button>
            </div>
          </div>
        )}

        {/* Keyframe Buttons Container */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          {/* Keyframe Buttons */}
          <div
            className="flex justify-center space-x-6 mt-4"
            style={{ marginRight: "350px" }}
          >
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
          <div
            className="flex justify-center mt-4"
            style={{ marginRight: "350px" }}
          >
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
