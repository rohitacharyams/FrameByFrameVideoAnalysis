
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { setNumOfFramesToSkip, setCurrentFrame, setFrameRate, setVideoFilename } from '../redux/actions';

const VideoPlayer = ({ videoInfo, frameRate, currentFrame, numOfFramesToSkip, setCurrentFrame, setNumOfFramesToSkip }) => {
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
  };

  const handleSeek = (e) => {
    setCurrentFrame(Math.floor(e.playedSeconds * frameRate));
  };

  const handleNumberOfFrames = (e) => {
    const newNum = parseInt(e.target.value, 10);
    setNumOfFramesToSkip(newNum);
  };

  const handleNextFrame = () => {
    console.log(currentFrame, numOfFramesToSkip, videoInfo, frameRate);
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + numOfFramesToSkip / frameRate, 'seconds');
    setCurrentFrame((prevFrame) => prevFrame + numOfFramesToSkip);
  };

  const handlePrevFrame = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - numOfFramesToSkip / frameRate, 'seconds');
    setCurrentFrame((prevFrame) => Math.max(0, prevFrame - numOfFramesToSkip));
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={videoInfo.videoUrl}
        playing={false}
        controls={true}
        playbackRate={1}
        width="100%"
        height="auto"
        onProgress={handleSeek}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
      <input type="number" value={numOfFramesToSkip} onChange={handleNumberOfFrames} />
      <label htmlFor="numOfFramesToSkip">Number of Frames to Skip</label>

      <div>
        <button onClick={handleNextFrame}>Next Frame</button>
        <button onClick={handlePrevFrame}>Previous Frame</button>
      </div>

      <div>
        <button onClick={() => handleSpeedChange(0.5)}>0.5x</button>
        <button onClick={() => handleSpeedChange(0.75)}>0.75x</button>
        <button onClick={() => handleSpeedChange(1)}>1x</button>
        <button onClick={() => handleSpeedChange(1.25)}>1.25x</button>
        <button onClick={() => handleSpeedChange(1.5)}>1.5x</button>
        <button onClick={() => handleSpeedChange(2)}>2x</button>
        <button onClick={() => handleSpeedChange(2.5)}>2.5x</button>
        {/* Add more buttons as needed */}
      </div>

      <p>Current Frame: {currentFrame}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  videoInfo: state.videoInfo,
  frameRate: state.frameRate,
  numOfFramesToSkip: state.numOfFramesToSkip,
  currentFrame: state.currentFrame,
});

const mapDispatchToProps = {
  setNumOfFramesToSkip,
  setCurrentFrame,
  setFrameRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
