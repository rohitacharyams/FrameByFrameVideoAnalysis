// components/FileInput.js
import React from 'react';
import { connect } from 'react-redux';
import { setVideoInfo, setFrameRate } from '../redux/actions';

const FileInput = ({ setVideoInfo, setFrameRate }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
            setVideoInfo({
                videoUrl: data.videoUrl,
              });
            console.log(data);
            fetch(`http://localhost:5000/get_frame_info`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoFilename: file.name }),
          })
            .then(response => response.json())
            .then(data =>{
                 const frameRate = parseInt(data.frameRate);
                 setFrameRate(frameRate);
                 console.log('the final value of data is', data);
                 console.log('frame_rate', data.frameRate);})
            .catch(error => console.error('Error getting frame rate:', error));
        })
        .catch((error) => console.error('Error uploading video:', error));
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    frameRate : state.frameRate,
    videoInfo : state.setVideoInfo,
  });

const mapDispatchToProps = {
  setVideoInfo,
  setFrameRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);
