import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import {
  stepFramesAtom,
  videoInfoAtom,
  frameRateAtom,
  currentFrameAtom,
  numOfFramesToSkipAtom,
  videoStateAtom,
  videoFilenameAtom,
  danceStepsAtom,
} from "../Recoil/atoms";

import ".//CustomControls.css";

const CustomVideoPlayer = () => {
  // Recoil states :
  const [stepFrames, setStepFrames] = useRecoilState(stepFramesAtom);
  const [videoInfo, setVideoInfo] = useRecoilState(videoInfoAtom);
  const [frameRate, setFrameRate] = useRecoilState(frameRateAtom);
  const [currentFrame, setCurrentFrame] = useRecoilState(currentFrameAtom);
  const [numOfFramesToSkip, setNumOfFramesToSkip] = useRecoilState(
    numOfFramesToSkipAtom
  );
  const [videoState, setVideoState] = useRecoilState(videoStateAtom);
  const [videoFilename, setVideoFilename] = useRecoilState(videoFilenameAtom);
  const [danceSteps, setDanceSteps] = useRecoilState(danceStepsAtom);

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [loop, setLoop] = useState(false);

  console.log("videoInfo:", videoInfo);
  console.log("DanceSteps are :", danceSteps);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [mirrored, setMirrored] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSteps = () => {
    setShowSteps(!showSteps); // Toggle visibility of steps
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMirroring = () => {
    setMirrored(!mirrored); // Toggle mirroring state
  };

  const fetchRandomVideo = async () => {
    console.log("Handling next video heyy");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:51040/api/videosFromStorageLabelled"
      );
      const data = await response.json();
      if (data.url) {
        await fetchVideo(data.url);
        console.log("The data is :", data);
        setVideoFilename(data.videoFilename);
        setDanceSteps(data.steps);
        fetch(`http://localhost:51040/get_frame_info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoFilename: data.videoFilename }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to get frame info");
            }
            return response.json();
          })
          .then((frameData) => {
            const frameRate = parseInt(frameData.frameRate);
            console.log(
              "Dude the frame rate came out to be :",
              frameRate,
              "And the name of video is :",
              frameData.videoFilename
            );

            setFrameRate(frameRate);

            console.log("The dance steps values are : ", danceSteps);
          })
          .catch((error) => console.error("Error getting frame rate:", error));
      } else {
        console.error("Error fetching video:", data.error);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
    setLoading(false);
  };

  const fetchVideo = async (url) => {
    try {
      const response = await fetch("http://localhost:51040/api/fetch_video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.message === "Video fetched") {
        setVideoUrl(data.videoUrl);
        console.log("the video url is : ", videoUrl);
      } else {
        console.error("Error fetching video:", data.error);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    if (playerRef.current && playerRef.current.getInternalPlayer()) {
      const videoElement = playerRef.current.getInternalPlayer();
      videoElement.style.transform = mirrored ? "scaleX(-1)" : "scaleX(1)";
    }
  }, [mirrored]);

  const playStep = (step) => {
    if (!step) return;
    console.log("Heyyy therere here is the new step with values", step);
    setCurrentStep(step);
    const startSeconds = step.keyFrameIn / frameRate;
    const endSeconds = step.keyFrameOut / frameRate;

    playerRef.current.seekTo(startSeconds, "seconds");
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
          playerRef.current.seekTo(startSeconds, "seconds");
        }
      }, 100);
    } else {
      // Stop playing when the end of the step is reached

      const timeout = setTimeout(() => {
        if (playerRef.current.getCurrentTime() >= endSeconds) {
          setPlaying(false);
        }
      }, endSeconds - startSeconds * 1000); // Convert to milliseconds

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
    console.log("Current value of step is :", currentStep.newStepId);
    var nextStep = null;
    if (currentStep.newStepId + 1 < danceSteps.length) {
      nextStep = danceSteps[currentStep.newStepId + 1];
      handleStepChange(nextStep);
      setCurrentStep(nextStep);
    }

    //setCurrentStepIndex(prev => (prev + 1) % danceSteps.length);
  };

  const handlePreviousStep = () => {
    var prevStep = null;
    if (currentStep.newStepId - 1 >= 0) {
      prevStep = danceSteps[currentStep.newStepId - 1];
      handleStepChange(prevStep);
      setCurrentStep(prevStep);
    }
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
      />
      <div className="controls">
        <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
        <button onClick={() => handlePreviousStep()}>Prev</button>
        <button onClick={() => handleNextStep()}>Next</button>
        <button onClick={toggleLoop}>{loop ? "Stop Loop" : "Loop"}</button>
        <button onClick={toggleMirroring}>
          {mirrored ? "Unmirror" : "Mirror"}
        </button>
        <button onClick={fetchRandomVideo}>Fetch New Video</button>
        {/* Additional control buttons */}
      </div>
      <div className="right-controls">
        <button className="steps-button" onClick={toggleSteps}>
          STEPS
        </button>
        <div className="steps-container">
          {danceSteps.map((step, index) => (
            <button
              key={index}
              className="button-step"
              onClick={() => playStep(step)}
            >
              Step {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
