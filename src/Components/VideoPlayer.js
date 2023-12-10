
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { setNumOfFramesToSkip, setCurrentFrame, setFrameRate } from '../redux/actions';

const VideoPlayer = ({ videoInfo, frameRate, currentFrame, numOfFramesToSkip, setCurrentFrame, setNumOfFramesToSkip }) => {
  const playerRef = useRef(null);

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
    console.log("jii");
    setCurrentFrame((prevFrame) => prevFrame + numOfFramesToSkip);
    console.log("jii");
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
