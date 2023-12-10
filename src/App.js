// App.js

// App.js
import React from 'react';
import FileInput from './Components/FileInput';
import VideoPlayer from './Components/VideoPlayer';
import Keyframes from './Components/Keyframes';

const App = () => {
  return (
    <div>
      <h1>Video Editor App</h1>
      <FileInput />
      <VideoPlayer />
      <Keyframes />
    </div>
  );
};

export default App;











// import React, { useState, useRef } from 'react';
// import ReactPlayer from 'react-player';

// const App = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [numOfFramesToSkip, setnumOfFramesToSkip] = useState(1);
//   const [currentFrame, setCurrentFrame] = useState(0);
//   const [frameRate, setFrameRate] = useState(30); // Set the correct frame rate for your video
//   const playerRef = useRef(null);
//   const [keyframes, setKeyframes] = useState([]);
//   const [KeyframeBool, setKeyframeBool] = useState({
//     keyFrameInActive : true,
//     keyFrameOutActive : false
//   });

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const formData = new FormData();
//       formData.append('video', file);

//       fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then(response => response.json())
//         .then(data => {
//           setVideoUrl(data.videoUrl);
//           fetch(`http://localhost:5000/get_frame_info`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ videoFilename: file.name }),
//           })
//             .then(response => response.json())
//             .then(data => setFrameRate(data.frameRate))
//             .catch(error => console.error('Error getting frame rate:', error));
//         })
//         .catch(error => console.error('Error uploading video:', error));
//     }
//   };

//   const handleNextFrame = () => {
//     console.log('the frame rate is', frameRate);
//     console.log('current frame is : ', currentFrame, 'The value of (currentTime()) is:', playerRef.current.getCurrentTime());
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() + numOfFramesToSkip / frameRate, 'seconds');
//     setCurrentFrame(prevFrame => prevFrame + numOfFramesToSkip);
//   };

//   const handlePrevFrame = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() - numOfFramesToSkip / frameRate, 'seconds');
//     setCurrentFrame(prevFrame => Math.max(0, prevFrame - numOfFramesToSkip));
//   };

//   const handleSeek = (e) => {
//     setCurrentFrame(Math.floor(e.playedSeconds * frameRate));
//   };

//   const handleNumberOfFrames = (e) => {
//     const newNum = parseInt(e.target.value, 10);
//     setnumOfFramesToSkip(newNum);
//   }

//   const handleAddKeyframeIn = () => {
//     // Add the current frame as a keyframe with type 'in'
//     if(!KeyframeBool.keyFrameOutActive)
//     {
//       console.log("A keyframe is already active, first close that and then add another keyframe");
//       return;
//     }
//     setKeyframes([...keyframes, { frame: currentFrame, type: 'in' }]);
//     setKeyframeBool({keyFrameInActive : true, keyFrameOutActive: false});
//   };

//   const handleAddKeyframeOut = () => {
//     // Add the current frame as a keyframe with type 'out'
//     if(!KeyframeBool.keyFrameInActive)
//     {
//       console.log("Keyframe is already closed, first open one and then try closing it");
//       return;
//     }
//     setKeyframes([...keyframes, { frame: currentFrame, type: 'out' }]);
//     setKeyframeBool({keyFrameInActive : false, keyFrameOutActive: true});
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//        {/* <input type="number" accept="number" onChange={handleNumberOfFrames} value={numOfFramesToSkip} /> */}
//        <button
//           onClick={handleAddKeyframeIn}
//           disabled={!KeyframeBool.keyFrameOutActive}
//         >
//           Add Keyframe In
//         </button>

//         <button
//           onClick={handleAddKeyframeOut}
//           disabled={!KeyframeBool.keyFrameInActive}
//         >
//           Add Keyframe Out
//         </button>

//       <input
//         type="number"
//         value={numOfFramesToSkip}
//         onChange={handleNumberOfFrames}
//       />
//       <label htmlFor="numOfFramesToSkip">Number of Frames to Skip</label>

//       <div>
//         <h3>Keyframes:</h3>
//         <ul>
//           {keyframes.map((keyframe, index) => (
//             <li key={index}>{`Frame ${keyframe.frame} - Type: ${keyframe.type}`}</li>
//           ))}
//         </ul>
//       </div>

//       {videoUrl && (
//         <ReactPlayer
//           ref={playerRef}
//           url={videoUrl}
//           playing={false}
//           controls={true}
//           playbackRate={1}
//           width="100%"
//           height="auto"
//           onProgress={handleSeek}
//           config={{
//             file: {
//               forceVideo: true,
//               attributes: {
//                 controlsList: 'nodownload',
//               },
//             },
//           }}
//         />
//       )}

//       <div>
//         <button onClick={handleNextFrame}>Next Frame</button>
//         <button onClick={handlePrevFrame}>Previous Frame</button>
//       </div>

//       <p>Current Frame: {currentFrame}</p>
//     </div>
//   );
// };

// export default App;
