// App.js

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frameRate, setFrameRate] = useState(30); // Set the correct frame rate for your video
  const playerRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setVideoUrl(data.videoUrl);
          fetch(`http://localhost:5000/get_frame_info`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoFilename: file.name }),
          })
            .then(response => response.json())
            .then(data => setFrameRate(data.frameRate))
            .catch(error => console.error('Error getting frame rate:', error));
        })
        .catch(error => console.error('Error uploading video:', error));
    }
  };

  const handleNextFrame = () => {
    console.log('frame rate is', frameRate);
    console.log('current frame is : ', currentFrame, 'The value of (currentFrame + 1) / frameRate is:', ((currentFrame + 1) / frameRate));
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 1 / frameRate, 'seconds');
    setCurrentFrame(prevFrame => prevFrame + 1);
  };

  const handlePrevFrame = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 1 / frameRate, 'seconds');
    setCurrentFrame(prevFrame => Math.max(0, prevFrame - 1));
  };

  const handleSeek = (e) => {
    setCurrentFrame(Math.floor(e.playedSeconds * frameRate));
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />

      {videoUrl && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
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
      )}

      <div>
        <button onClick={handleNextFrame}>Next Frame</button>
        <button onClick={handlePrevFrame}>Previous Frame</button>
      </div>

      <p>Current Frame: {currentFrame}</p>
    </div>
  );
};

export default App;
